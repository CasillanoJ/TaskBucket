const User = require('../Models/user_model')
const Task = require('../Models/task_model')


const getUserTask = async (req, res , next) =>{

    try {


      const  getTask =  await Task.find({assignee:req.params.id})


      if(getTask != 0){
          res.status(200).json({
            successful: true,
            message: "Succesfully retrieved User details.",
            count: getTask.length,
            data: getTask
          })
      }else{
        res.status(200).json({
          successful: true,
          message:"No task assigned to you"
        })
      }


    } catch (error) {
      res.status(500).send({
        successful: false,
        message: error.message
    })
    }  
}

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

const getTodoTask = async(req,res, next)=>{
  try{



    const requestId = req.params.id;

    let findQuery = statusQuery(requestId,'To-do')
    
     const count = req.query.count;

      const  getTask = await Task.find(findQuery).populate('assignee', 'first_name last_name').limit(10).skip(count);
      

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
        message:"No task to display "
      })
    }

  }catch(error){
      res.status(500).send({
        successful: false,
        message: error.message
    })
  }
}

const getInProgress = async(req,res, next)=>{

  


  try{
      const getTask = await Task.find({status: "In progress" })
    
      if(getTask != 0){


        res.status(200).json({
          successful: true,
          message: "Succesfully retrieved USER details.",
          count: getTask.length,
          data: getTask
        })
    }else{
      res.status(200).json({
        successful: true,
        message:"No task to display "
      })
    }

  }catch(error){
      res.status(500).send({
        successful: false,
        message: error.message
    })
  }
}

 const statusQuery =(requestId,field )=>{

  if (!requestId) {
    return { status: `${field}` };
  } else {
    return { $and: [{ status: `${field}` }, { assignee: requestId }] };
  }
 }

module.exports ={
  getUserTask,
  getAllTaskAdmin,
  getUnassignedTask,
  getTodoTask,
  getInProgress
}