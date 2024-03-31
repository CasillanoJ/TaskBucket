const User = require('../Models/user_model')
const Task = require('../Models/task_model')

const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');


const getTaskList = async (req, res , next) =>{

  // For Task List


  try {
    
  const userId = req.user.userId;
  const isAdmin = req.user.isAdmin

  const count = req.params.count


    let getTask ={}
    if(isAdmin){
       getTask =  await Task.find().populate('assignee','first_name last_name email').limit(10).skip(count)
    }else{
      getTask = await Task.find({assignee:userId}).populate('assignee','first_name last_name email').limit(10).skip(count)
    }
     if(getTask != 0){
          res.status(200).json({
            successful: true,
            message: "Succesfully retrieved Task details.",
            count: getTask.length,
            data: getTask
          })
      }else{
        res.status(200).json({
          successful: true,
          message:"No task created yet"
        })
      }
  

  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message
  })
  }  
  
}

const getUnassignedTask = async(req,res, next)=>{
  try{
      //For Dashboard 
      const userId = req.user.userId;
      const isAdmin = req.user.isAdmin

      const count = req.params.count


      const getTask = await Task.find({status: "Unassigned"}).limit(5).skip(count)
    
      if(getTask != 0){
        res.status(200).json({
          successful: true,
          message: "Succesfully retrieved Task details.",
          count: getTask.length,
          data: getTask
        })
    }else{
      res.status(200).json({
        successful: true,
        message:"No task to display"
      })
    }

  }catch(error){
      res.status(500).send({
        successful: false,
        message: error.message
    })
  }
}



const getTask = async(req,res, next)=>{
  try{
      //For Dashboard

      const requestId = req.user.userId
      const count = req.query.count;
      const status = req.body.status
      const isAdmin = req.user.isAdmin

  
          if(status == "To-do" || status == "In Progress" ){
            let findQuery = statusQuery(requestId, status, isAdmin)
            const  getTotal = await Task.find(findQuery);
            const  getTask = await Task.find(findQuery).populate('assignee', 'first_name last_name').limit(5).skip(count);

            if(getTask != 0 && getTotal !=0){

              res.status(200).json({
                successful: true,
                message: "Succesfully retrieved Task details.",
                totalCount: getTotal.length,
                limitCount: getTask.length,
                data: getTask
              })

          }else{
            res.status(200).json({
              successful: true,
              message:"No task to display"
            })
          }
              
          }else{
          res.status(404).json({
            successful: false,
            message:"Invalid Task Status "
          })
      }
    

  }catch(error){
      res.status(500).send({
        successful: false,
        message: error.message
    })
  }
}

const getCompletedTaskDateRange = async (req, res, next) =>{

  try {


    const isAdmin = req.user.isAdmin
    const userId = req.user.userId


    //For Dashboard
    const count = req.query.count;
    const dateToday = new Date()
    dateToday.setHours(0, 0, 0, 0);
    

    const currentDate = new Date(); 
    currentDate.setHours(0, 0, 0, 0)
    currentDate.setDate(currentDate.getDate() + 11); 

    let getCompletedTasks ={}

    if(isAdmin){
      getCompletedTasks = await Task.find({
        completedAt: {
          $lte: currentDate,
          $gte: dateToday
        },
        status: "Completed"
      }).populate('assignee', 'first_name last_name').limit(5).skip(count);
    }else{
      getCompletedTasks = await Task.find({
        completedAt: {
          $lte: currentDate,
          $gte: dateToday
        },
        status: "Completed",
        assignee: userId
      }).populate('assignee', 'first_name last_name').limit(5).skip(count);
    }
    
    


    if(getCompletedTasks != 0){

      res.status(200).json({
        successful: true,
        message: "Succesfully retrieved Task details.",
        totalCount: getCompletedTasks.length,
        limitCount: getCompletedTasks.length,
        data: getCompletedTasks
      })
    }else{
      res.status(200).json({
        successful: true,
        message:"No Completed Task yet to display"
      })
    }


  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message
  })
  }
}


const getEachUserProgression = async (req, res, next) => {
  try {


    const { id: userID, startDate, endDate } = req.body;
    const dateToday = new Date();

    

    if(userID) {
      const filter = {
        assignee: userID,
        createdAt: { $lte: endDate, $gte: startDate }
      };

      const getTotalTask = await Task.countDocuments(filter);
      const getTotalCompleted = await Task.countDocuments({ ...filter, completedAt: { $lte: endDate, $gte: startDate } });
      const getTotalTodo = await Task.countDocuments({ ...filter, status: "To-do" , dueDate: { $lte: dateToday }});
      const getTotalInprogress = await Task.countDocuments({ ...filter, status: "In progress" });

      

      const countDocumentsWithPriorityLevel = async (priorityLevel) => {
        return await Task.countDocuments({
          ...filter,
          $and: [
            { priorityLevel: priorityLevel },
            { dueDate: { $lte: dateToday } },
            { status: { $ne: "Completed" } }
          ]
        });
      };
      
      const getTotalUrgent = await countDocumentsWithPriorityLevel("Urgent");
      const getTotalHigh = await countDocumentsWithPriorityLevel("High");
      const getTotalNeutral = await countDocumentsWithPriorityLevel("Neutral");
    

      const getTotalLateTask = await Task.countDocuments({ ...filter, dueDate: { $gt: dateToday } });

      const total = getTotalTask;
      const totalCompleted = getTotalCompleted;

      const taskProgress = total !== 0 ? (totalCompleted / total) * 100 : 0;

      const response = {
        successful: true,
        message: total ? "Successfully retrieved total task." : "No task assigned to the user",
        totalCount: total,
        completedCount: totalCompleted,
        totalInprogress: getTotalInprogress,
        totalLateTask: getTotalLateTask,
        totalToDo: getTotalTodo,
        taskProgress: taskProgress,
        totalUrgent: getTotalUrgent,
        totalHigh: getTotalHigh,
        totalNeutral: getTotalNeutral
      };

      res.status(200).json(response);
    } else {
      res.status(404).json({
        successful: false,
        message: "User ID is required "
      });
    }
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message
    });
  }
};

const exportDataAsExcel = async (req, res, next)=>{
  try{  

    const { startDate, endDate } = req.body;

    const tasks = await Task.find({
      completedAt: { $gte: startDate, $lte: endDate },
      status: "Completed"
  }).populate('assignee').lean();
    

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');


    worksheet.columns = [
      { header: 'Title', key: 'title', width: 20 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Priority Level', key: 'priorityLevel', width: 15 },
      { header: 'Assignee First Name', key: 'assigneeFirstName', width: 20 },
      { header: 'Assignee Last Name', key: 'assigneeLastName', width: 20 },
      { header: 'Assignee Email', key: 'assigneeEmail', width: 30 },
      { header: 'Due Date', key: 'dueDate', width: 15, style: { numFmt: 'yyyy-mm-dd' } },
      { header: 'Started At', key: 'startedAt', width: 15, style: { numFmt: 'yyyy-mm-dd' } },
      { header: 'Completed At', key: 'completedAt', width: 15, style: { numFmt: 'yyyy-mm-dd' } },
      { header: 'Status', key: 'status', width: 15 },
    ];

    const rows = tasks.map(task => ({
      title: task.title,
      description: task.description,
      priorityLevel: task.priorityLevel,
      assigneeFirstName: task.assignee ? task.assignee.first_name : 'Unassigned',
      assigneeLastName: task.assignee ? task.assignee.last_name : 'Unassigned',
      assigneeEmail: task.assignee ? task.assignee.email : 'Unassigned',
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : 'No Due date Assigned ', 
      startedAt: task.startedAt ? task.startedAt.toISOString().split('T')[0] : '', 
      completedAt: task.completedAt ? task.completedAt.toISOString().split('T')[0] : '', 
      status: task.status,
    }));

    worksheet.addRows(rows);

    // Generate the Excel file
    const filePath = path.join(__dirname, 'tasks.xlsx');
    await workbook.xlsx.writeFile(filePath);

    res.setHeader('Content-Disposition', 'attachment; filename=tasks.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    res.status(500).send({
      successful: true,
      message: "Sucesfully exported Tasks" 
    });
    
      

  }catch(error){
    res.status(500).send({
      successful: false,
      message: error.message
    });
  }


}



 const statusQuery =(requestId,field, isAdmin)=>{
  if (isAdmin == true) {
    return { status: `${field}` };
  } else {
    return { $and: [{ status: `${field}` }, { assignee: requestId }] };
  }

 }

module.exports ={
  getTask,
   getTaskList,
  getUnassignedTask,
  getCompletedTaskDateRange,
  getEachUserProgression,
  exportDataAsExcel

}