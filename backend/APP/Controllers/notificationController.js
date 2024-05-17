const Notification = require('../Models/notification_model')
const {SendEmail} = require('../Controllers/nodeEmailerController')

 async function CreateNotification(method, userID, title  ){

  try{
    if(userID == "" || userID == null){
      userID = null
    }
    let emailHeader;

    let message;
    switch (method) {
        case "Create Task":
            message = `A new task titled "${title}" has been assigned to you.`;
            emailHeader = `Created Task`

            break;
        case "Update Task":
            message = `The task titled "${title}" has been updated.`;
            emailHeader = `Updated Task`

            break;
        case "Update Status":
            message = `The status of the task titled "${title}" has been updated.`;
            emailHeader = `Updated Status`
            break;
        case "Unassigned Task":
            message = `A new task titled "${title}" has been created and Unassigned`;
            emailHeader = `Created Task without an Assignee`
            userID = null
            break;
        default:
            message = "No specific message for this method.";
            break;
    }
    

    const newNotification = new Notification({
      recipient: userID,
      message: message
    })

  
    await newNotification.save()
    
    return message

  }catch(err){
    throw new Error(err)
  }
}


const GetNotification = async(req, res, next)=>{
  try{
    const userId = req.user.userId
    const userNotifications = await Notification.find({ $or: [{ recipient: userId }, { recipient: null }] });

    res.status(200).json({
      successful: true,
      message: "Succesfully retrieved Task details.",
      totalCount: userNotifications.length,
      notifications: userNotifications
    })

  }catch(err){
    res.status(500).send({
      successful: false,
      message: err.message
  })
  }
}

const ReadNotification = async(req, res, next)=>{
  try {
    const userId = req.user.userId
    const notificationId = req.body.notificationId
    if(!notificationId){
      res.status(400).json({
        successful: false,
        message: "Invalid Notification ID",
      })
    }else{
      const userNotifications = await Notification.findOne({ $and: [{ recipient: userId }, { _id: notificationId }] });
      userNotifications.read = true

        await userNotifications.save()
      
      res.status(200).json({
        successful: true,
        message: "Notification succesfully read"
      })
    }
  } catch (err) {
    res.status(500).send({
      successful: false,
      message: err.message
  })
  }
}

module.exports = {
  CreateNotification,
  GetNotification,
  ReadNotification
};

