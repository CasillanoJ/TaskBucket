const User = require('../Models/user_model')
const Task = require('../Models/task_model')
const { get } = require('mongoose')

const getUserTask = (req, res , next) =>{

    try {

     getUserTask = Task.find({assignee:req.params.id})

      if(getUserTask != 0){
          res.status(200).json({
            successful: true,
            message: "Succesfully retrieved User details.",
            count: getUserTask.length,
            data: getUserTask
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
  getUserTask
}