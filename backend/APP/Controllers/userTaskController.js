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
          if(status == "To-do" || status == "In Progress"  || status =="Completed"){
            let findQuery = statusQuery(requestId, status, isAdmin)
            const  getTotal = await Task.find(findQuery).populate('assignee', 'first_name last_name')
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

}