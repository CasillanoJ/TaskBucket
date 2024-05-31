const User = require('../Models/user_model')
const Task = require('../Models/task_model')

const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');


const getTaskList = async (req, res , next) =>{
  try {
  
  const userId = req.user.userId;
  const isAdmin = req.user.isAdmin
  const status = req.body.status
  const count = req.params.count
  const limit = req.query.limit



  let dateToday = new Date();
  dateToday.setHours(0, 0, 0, 0); 
  let dateTodayISO = dateToday.toISOString().split('T')[0];
  
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); 
  currentDate.setDate(currentDate.getDate() + 11);
  let currentDateISO = currentDate.toISOString().split('T')[0];



    let getTask ={}
    let taskCount ={}


     let message = "No task created yet"

     if(status !== "Completed" && status !== "Unassigned" && status !== "To do" && status !== "In progress" && status !== "View Task List") {
      return res.status(404).json({
          successful: false,
          message: "Invalid Task Status"
      });
  }
   

    if(status == "Completed"){
      if(isAdmin){
        getTask = await Task.find({
          completedAt: {
            $lte: currentDateISO ,
            $gte: dateTodayISO
          },
          status: "Completed"
        }).populate('assignee', 'first_name last_name').limit(limit).skip(count);

        taskCount = await Task.find({
          completedAt: {
            $lte: currentDateISO,
            $gte: dateTodayISO
          },
          status: "Completed"
        }).countDocuments()

      }else{
        getTask = await Task.find({
          completedAt: {
            $lte: currentDateISO,
            $gte: dateTodayISO
          },
          status: "Completed",
          assignee: userId
        }).populate('assignee', 'first_name last_name').limit(limit).skip(count);

        
        taskCount = await Task.find({
          completedAt: {
            $lte: currentDateISO,
            $gte: dateTodayISO
          },
          status: "Completed",  
          assignee: userId
        }).countDocuments()


      }
      message = 'No Task Completed Yet'
    }


    if(status == "Unassigned"){
      getTask =  await Task.find({status: "Unassigned"}).populate('assignee','first_name last_name email').limit(limit).skip(count);
      taskCount = await Task.find({status: "Unassigned"}).countDocuments();

    }

    if(status == "To do" || status == "In progress" ){
      let findQuery = statusQuery(userId, status, isAdmin)
      taskCount = await Task.find(findQuery).countDocuments();
      getTask = await Task.find(findQuery).populate('assignee', 'first_name last_name').limit(limit).skip(count);
    }

    if(status == "View Task List"){
      if(isAdmin){
         getTask =  await Task.find().populate('assignee','first_name last_name email').limit(limit).skip(count)
         taskCount = await Task.find().countDocuments()
      }else{
        getTask = await Task.find({assignee:userId}).populate('assignee','first_name last_name email').limit(limit).skip(count)
        taskCount = await Task.find({assignee:userId}).countDocuments()
      }
    }




    if(getTask != 0){
     return res.status(200).json({
        successful: true,
        message: "Succesfully retrieved Task details.",
        totalTask :taskCount,
        count: getTask.length,
        data: getTask
      })
  }else{
     return res.status(200).json({
      successful: true,
      message: message
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

    let userID = req.params.id
    const { startDate, endDate } = req.body;
    const dateToday = new Date().toISOString().split('T')[0]

    const isAdmin = req.user.isAdmin

    if(!isAdmin){
      userID = req.user.userId
    }

    if(!userID){
      return res.status(404).send({
        successful: false,
        message: "User ID is required "
    })}

      let filter = {}
      let completeFilter= {}

      if(startDate.trim() == "" && endDate.trim() == "" || startDate.trim() =="" || endDate.trim() == ""){
        filter = {
          assignee: userID,
        }
      }else{
        filter = {
          assignee: userID,
          createdAt: { $lte: endDate, $gte: startDate }
      
        }
        completeFilter.completedAt = { $gte: startDate, $lte: endDate };
      }
     
       

      const getTotalTask = await Task.countDocuments(filter);
      const getTotalCompleted = await Task.countDocuments({ ...filter,status: "Completed", ...completeFilter});
      const getTotalTodo = await Task.countDocuments({ ...filter, status: "To do" });
      const getTotalInprogress = await Task.countDocuments({ ...filter, status: "In progress" });

      const TotalClaimedTask = await Task.countDocuments({...filter,isClaimed:"true"})

      

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
    

      const getTotalLateTask = await Task.countDocuments({ ...filter, dueDate: { $lt: dateToday } });
      const getTotalLateToDo = await Task.countDocuments({ ...filter,status:"To do", dueDate: { $lt: dateToday } });
      const getTotalLateInProgress = await Task.countDocuments({ ...filter,status:"In progress" , dueDate: { $lt: dateToday } });
      
    

      const total = getTotalTask;
      const totalCompleted = getTotalCompleted;

      const taskProgress = total !== 0 ? (totalCompleted / total) * 100 : 0;

      const response = {
        successful: true,
        message: total ? "Successfully retrieved total task." : "No task assigned to the user",
        totalTask: total,
        completedCount: totalCompleted,
        totalInprogress: getTotalInprogress,
        totalToDo: getTotalTodo,
        taskProgress: taskProgress,
        totalUrgent: getTotalUrgent,
        totalHigh: getTotalHigh,
        totalNeutral: getTotalNeutral,
        totalClaimed : TotalClaimedTask,
        totalLateTask: getTotalLateTask,
        totalLateTodo : getTotalLateToDo,
        totalLateInProgress: getTotalLateInProgress
      };

      res.status(200).send(response);

    }catch (error) {
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

    res.status(200).send({
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
  }else {
    return { $and: [{ status: `${field}` }, { assignee: requestId }] };
  }

 }


 const getTask = async (req, res, next) =>{
  try {
    const taskId = req.body.id;

    if(!taskId){
      return res.status(400).send({
        successful : false,
        message: "Task id is required"
      })
    }
    
    const task = await Task.find({_id: taskId}).populate('assignee','first_name last_name email')

    if(!task){
      return res.status(404).send({
        successful : false,
        message: "Task Not Found"
      })
    }

    return res.status(200).send({
      successful: true,
      data: task
    })


    
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message
    });
  }

 }

 const GetAllTaskProgress = async (req, res, next) => {
 
  try {
    const { startDate, endDate } = req.body;
    const dateToday = new Date().toISOString().split('T')[0];
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      return res.status(401).send({
        successful: false,
        message: "Unauthorized"
      });
    }

    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      };
    }

  console.log(dateFilter)
    const getTotalTask = await Task.countDocuments(dateFilter);
    const getTotalLateTask = await Task.countDocuments({
      ...dateFilter,
      dueDate: { $lt: dateToday }
    });
    const getTotalUnassignedTask = await Task.countDocuments({
      ...dateFilter,
      status: "Unassigned"
    });
    const getTotalCompleted = await Task.countDocuments({
      ...dateFilter,
      status: "Completed",
      completedAt: {
        $gte: startDate,
        $lte: endDate
      }
    });
    const getTotalTodo = await Task.countDocuments({
      ...dateFilter,
      status: "To do"
    });
    const getTotalInprogress = await Task.countDocuments({
      ...dateFilter,
      status: "In progress"
    });

    const getTotalTaskWithDueDate = await Task.countDocuments({...dateFilter, dueDate:{$ne: null}})

    const response = {
      successful: true,
      message: getTotalTask ? "Successfully retrieved total task." : "No tasks found in the specified date range",
      data:{
        totalTask: getTotalTask,
        totalLateTask: getTotalLateTask,
        totalUnassigned: getTotalUnassignedTask,
        totalCompleted: getTotalCompleted,
        totalTodo: getTotalTodo,
        totalInprogress: getTotalInprogress,
        totalTaskwithDueDate:getTotalTaskWithDueDate
      }
    };

    res.status(200).send(response);
  } catch (error) {
    console.log(error)
    res.status(500).send({
      successful: false,
      message: error.message
    });
  }
};


module.exports ={
   getTaskList,
  getEachUserProgression,
  exportDataAsExcel,
  getTask,
  GetAllTaskProgress

}