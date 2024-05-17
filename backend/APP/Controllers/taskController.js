<<<<<<< HEAD

const Task = require("../Models/task_model");
const User = require("../Models/user_model");
const {SendEmail} = require('./nodeEmailerController')

const {CreateNotification} = require('./notificationController')

=======
const Task = require("../Models/task_model");
const { SendEmail } = require("./nodeEmailerController");
const { CreateNotification } = require("./notificationController");
>>>>>>> origin/backend/frontend/merge

// Multer configuration for file uploads
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file"); // Specify the field name for the file

const createTask = async (req, res) => {
  try {
<<<<<<< HEAD
    const tasks = await User.find();

    res.status(200).json({ tasks });
    console.log(tasks)
=======
    // Use multer to handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res
          .status(400)
          .json({ successful: false, message: err.message });
      } else if (err) {
        // An unknown error occurred when uploading
        return res
          .status(500)
          .json({ successful: false, message: err.message });
      }

      const { title, description, priorityLevel, assignee, dueDate, status } =
        req.body;
      const attachedFiles = req.file ? [req.file.originalname] : []; // Get the filename if file is uploaded, otherwise set to empty array

      try {
        const isAdmin = req.user.isAdmin;

        if (isAdmin) {
          const newTask = new Task({
            title,
            description,
            priorityLevel,
            assignee,
            dueDate,
            status,
            attachedFiles: attachedFiles || [], // Set attached_files to empty array if not provided
          });

          if (assignee == null) {
            newTask.status = "Unassigned";
          } else {
            newTask.status = "To do";
          }

          const savedTask = await newTask.save(); // Make sure to await the save operation
          console.log("Saved task:", savedTask);
          // const populatedTask = await savedTask
          //   .populate("assignee", "email")
          //   .execPopulate();

          let NotificationMessage;
          if (savedTask.assignee != null) {
            NotificationMessage = await CreateNotification(
              "Create Task",
              savedTask.assignee,
              savedTask.title
            );
            // SendEmail(
            //   NotificationMessage,
            //   "Created Task",
            //   populatedTask.assignee.email
            // );
          } else {
            NotificationMessage = await CreateNotification(
              "Unassigned Task",
              savedTask.assignee,
              savedTask.title
            );
          }

          return res.status(201).send({
            successful: true,
            message: `Successfully added Task: ${savedTask.title}`,
            task: savedTask._id,
          });
        } else {
          return res.status(401).json({
            successful: false,
            message: `Unauthorized access`,
          });
        }
      } catch (error) {
        if (error.message.includes("assignee")) {
          return res.status(404).send({
            successful: false,
            message: "Assignee not found",
          });
        }
        return res.status(500).send({
          successful: false,
          message: error.message,
        });
      }
    });
>>>>>>> origin/backend/frontend/merge
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

<<<<<<< HEAD
const createTask = async (req, res) => {
  const { title, description, priorityLevel, assignee, dueDate, status } =
    req.body;


  try {
    
    const isAdmin = req.user.isAdmin

    if(isAdmin){
      
    const task = new Task({
      title,
      description,
      priorityLevel,
      assignee,
      dueDate,
      status,
    });

    if (assignee == null) {
      task.status = "Unassigned";
    } else {
      task.status = "To-do";

    }

    const savedTask = await task.save();
    const email  = await User.find();
    console.log(email)
    
    let NotificationMessage 
    if(savedTask.assignee != null){
      NotificationMessage =  await CreateNotification("Create Task", savedTask.assignee, savedTask.title)
      const { email } = await User.findById(savedTask.assignee);
      SendEmail(NotificationMessage, "Created Task", email);
    }else if (assignee == null){
      NotificationMessage = await CreateNotification("Unassigned Task", savedTask.assignee, savedTask.title)
      const  user = await User.find();
      user.forEach(element => {
        savedTask.assignee = element
      });
      const { email } = await User.findById(savedTask.assignee);
      SendEmail(NotificationMessage, "Created Task", email);
    }

    

    res.status(201).send({
      successful: true,
      message: `Successfully added Task: ${savedTask.title}`,
      task: savedTask._id,
    });
  }else{
    res.status(401).json({
      successful: false,
      message: `Unauthorized access`,
    })

  }

  } catch (error) {
    if (error.message.includes("assignee")) {
      return res.status(404).send({
        successful: false,
        message: "Assignee not found",
      });
    }
    if (error.message.includes("assignee")) {
      return res.status(404).send({
        successful: false,
        message: "Assignee not found",
      });
    }
=======
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      "assignee",
      "first_name last_name"
    );

    res.status(200).json({ tasks });
  } catch (error) {
>>>>>>> origin/backend/frontend/merge
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};


const updateTask = async (req, res) => {
  const { title, description, priorityLevel, assignee, dueDate } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return handleTaskMethod(res, task, "");
    }

    task.title = title;
    task.description = description;
    task.priorityLevel = priorityLevel;
    task.assignee = assignee;
    task.dueDate = dueDate;

    const taskUpdate = await task.save();
<<<<<<< HEAD
  

   const NotificationMessage = await CreateNotification("Update Task", taskUpdate.assignee, taskUpdate.title)

   if(taskUpdate.assignee != null || taskUpdate.assignee != "" ){
    const { email } = await User.findById(taskUpdate.assignee);
    SendEmail(NotificationMessage, "Updated Task", email)
   }
=======
    await taskUpdate.populate("assignee", "email").execPopulate();

    const NotificationMessage = await CreateNotification(
      "Update Task",
      taskUpdate.assignee,
      taskUpdate.title
    );

    if (taskUpdate.assignee != null || taskUpdate.assignee != "") {
      SendEmail(
        NotificationMessage,
        "Updated Status",
        taskUpdate.assignee.email
      );
    }
>>>>>>> origin/backend/frontend/merge

    handleTaskMethod(res, taskUpdate, "updated");
  } catch (error) {
    if (error.message.includes("assignee")) {
      return res.status(404).send({
        successful: false,
        message: "Assignee not found",
      });
    }
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    let updatedStats = await Task.findById(req.params.id);

    updatedStats.status = req.body.status;
    updatedStats = await updatedStats.save();
<<<<<<< HEAD
  

   const NotificationMessage =  await CreateNotification("Update Status", updatedStats.assignee, updatedStats.title)
   if(updatedStats.assignee != null || updatedStats.assignee != "" ){

    const { email } = await User.findById(updatedStats.assignee);
    SendEmail(NotificationMessage, "Updated Status", email)
    
   
   }
=======
    await updatedStats.populate("assignee", "email").execPopulate();

    const NotificationMessage = await CreateNotification(
      "Update Status",
      updatedStats.assignee,
      updatedStats.title
    );
    if (updatedStats.assignee != null || updatedStats.assignee != "") {
      SendEmail(
        NotificationMessage,
        "Updated Status",
        updatedStats.assignee.email
      );
    }
>>>>>>> origin/backend/frontend/merge

    handleTaskMethod(res, updatedStats, "Updated status of");
  } catch (err) {
    res.status(500).send({
      successful: false,
      message: err.message,
    });
  }
};

const isClaimed = async (req, res) => {
  try {
    let claimedTask = await Task.findById(req.params.id);

    if (!claimedTask) {
      return handleTaskMethod(res, claimedTask, "");
    }

    if (claimedTask.status != "Unassigned") {
      claimedTask.isClaimed = true;
    } else {
      claimedTask.isClaimed = false;
    }
    claimedTask = await claimedTask.save();

    handleTaskMethod(res, claimedTask, "claimed");
  } catch (err) {
    res.status(500).send({
      successful: false,
      message: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete({ _id: req.params.id });

    handleTaskMethod(res, deletedTask, "deleted");
  } catch (err) {
    res.status(500).send({
      successful: false,
      message: err.message,
    });
  }
};

const filterTasks = async (req, res) => {
  try {
    let filter = {};

    if (req.body.priorityLevel) {
      const priorityLevels = Array.isArray(req.body.priorityLevel)
        ? req.body.priorityLevel
        : [req.body.priorityLevel];
      filter.priorityLevel = { $in: priorityLevels };
    }

    if (req.body.status) {
      const statuses = Array.isArray(req.body.status)
        ? req.body.status
        : [req.body.status];
      filter.status = { $in: statuses };
    }

    const filteredTasks = await Task.find(filter);

    handleTaskMethod(res, filteredTasks, "filtered");
  } catch (err) {
    res.status(500).send({
      successful: false,
      message: err.message,
    });
  }
};

const sortBy = async (req, res) => {
  try {
    let category = parseInt(req.search.category);
    let sortCat = "";
    let sortValue = 0;

    //CATEGORY:
    //1 - latest task - descending
    //2 - oldest task - ascending
    //3 - high priority - descending
    //4 - low priority - ascending
    //5 - due date - descending

    switch (category) {
      case 1:
      case 3:
      case 5:
        sortValue = -1;
        break;
      case 2:
      case 4:
        sortValue = 1;
        break;
      default:
        sortValue = 1;
        break;
    }

    switch (category) {
      case 1:
      case 2:
        sortCat = "createdAt";
        break;
      case 3:
      case 4:
        sortCat = "priorityLevel";
        break;
      case 5:
        sortCat = "dueDate";
        break;
      default:
        sortCat = "createdAt";
        break;
    }

    let sort = {};
    sort[sortCat] = sortValue;

    const sortedTask = await Task.find().sort(sort);

    handleTaskMethod(res, sortedTask, "sorted");
  } catch (err) {
    res.status(500).send({
      successful: false,
      message: err.message,
    });
  }
};

async function handleTaskMethod(res, action, str) {
  if (!action) {
    res.status(404).send({
      successful: false,
      message: "Task does not exist",
    });
  } else {
    res.status(200).send({
      data: action,
      successful: true,
      message: `Successfully ${str} Task.`,
      id: action._id,
    });
  }
}

const getTotalcompletedofuser = async (req, res) => {
  const { userId, startDate, endDate } = req.search;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const tasks = await Task.find({
      assignee: userId,
      status: "Completed",
      dueDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.json({
      message: `${user.first_name} has completed ${tasks.length} tasks`,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getHistoryLogs = async (req, res) => {
  const { startDate, endDate } = req.search;

  try {
    const tasks = await Task.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchTasks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim().length === 0) {
      return res
        .status(400)
        .send("Query parameter is required and cannot be empty.");
    }

    const tasks = await Task.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ) // Sorting by textScore to show best matches first
      .sort({ score: { $meta: "textScore" } })
      .limit(10);

    if (tasks.length === 0) {
      const partialTasks = await Task.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // Partial search on title
          { description: { $regex: query, $options: "i" } }, // Partial search on description
        ],
      }).limit(10);

      res.json({ count: partialTasks.length, data: partialTasks });
    } else {
      res.json({ count: tasks.length, data: tasks });
    }
  } catch (error) {
    console.error("Search Task Error:", error);
    res.status(500).send("An error occurred while searching for tasks.");
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  updateStatus,
  isClaimed,
  deleteTask,
  sortBy,
  filterTasks,
  getTotalcompletedofuser,
  getHistoryLogs,
  searchTasks,
};
