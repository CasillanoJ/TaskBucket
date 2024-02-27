const User = require('../Models/user_model')
const Task = require('../Models/task_model')

const getAllTaskAdmin = async (req, res , next) =>{

  // Add limit and skip tasks
  const count = req.params.count

  try {

    const  getTask =  await Task.find().populate('assignee','first_name last_name email').limit(10).skip(count)

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

      const getTask = await Task.find({status: "Unassigned"}).limit(10).skip(req.params.count)
    
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

      let requestId = req.params.id
      const count = req.query.count;
      const status = req.body.status
      const isAdmin = req.body.isAdmin

  
      if(!isAdmin && !requestId){
        res.status(404).json({
          successful: false,
          message:"Need request ID"
        })
      }else{
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

    const count = req.query.count;
    const dateToday = new Date()
    dateToday.setHours(0, 0, 0, 0);
    

    const currentDate = new Date(); 
    currentDate.setHours(0, 0, 0, 0)
    currentDate.setDate(currentDate.getDate() + 11); 
    
 
    const getCompletedTasks = await Task.find({
      completedAt: {
        $lte: currentDate,
        $gte: dateToday
      },
      status: "Completed"
    }).populate('assignee', 'first_name last_name').limit(5).skip(count);


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
        message:"No task to display"
      })
    }


  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message
  })
  }
}


const getEachUserProgression = async(req,res,next) =>{

  try {
    const userID = req.body.id;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const getTotal = await Task.find({
      assignee: userID,
      createdAt:{
        $lte: endDate,
        $gte: startDate
      }
      }
      )
      
    const getTotalCompleted = await Task.find({
      assignee:userID,
      completedAt:{
        $lte: endDate,
        $gte: startDate
      }
    })

    let total = getTotal.length
    let totalCompleted = getTotalCompleted.length

    if(getTotalCompleted.length == 0){
      totalCompleted = 0
    }

    console.log(total)
    console.log(totalCompleted)


    let getPercentage = (totalCompleted/total) * 100

    console.log(getPercentage)

    res.status(200).json({
      successful: true,
      message: "Succesfully retrieved Task details.",
      totalCount: getTotal.length,
      completedCount: getTotalCompleted.length,
      progress: getPercentage
    })

    


  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message
  })
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
  getAllTaskAdmin,
  getUnassignedTask,
  getCompletedTaskDateRange,
  getEachUserProgression

}