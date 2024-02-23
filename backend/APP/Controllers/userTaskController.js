const User = require('../Models/user_model')
const Task = require('../Models/task_model')
const { get } = require('mongoose')

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

const getTaskAdmin = async (req, res , next) =>{

  try {


    const  getTask =  await Task.find().populate('assignee','first_name last_name email')



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

module.exports ={
  getUserTask,
  getTaskAdmin,
}