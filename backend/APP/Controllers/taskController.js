const Task = require("../Models/task_model");
const User = require("../Models/user_model");
const { SendEmail } = require("./nodeEmailerController");

const { CreateNotification } = require("./notificationController");

// Multer configuration for file uploads
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file"); // Specify the field name for the file

const createTask = async (req, res) => {
  try {
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

      let { title, description, priorityLevel, assignee, dueDate } = req.body;
      const attachedFiles = req.file ? [req.file.originalname] : []; // Get the filename if file is uploaded, otherwise set to empty array

      try {
        let status = "";
        const isAdmin = req.user.isAdmin;

        if (
          assignee == null ||
          assignee.trim() === "" ||
          assignee == "None" ||
          !assignee
        ) {
          status = "Unassigned";
          assignee = null;
        } else {
          status = "To do";
        }

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
            const { email } = await User.findById(savedTask.assignee);
            const admin = await emailForAdmin();
            SendEmail(NotificationMessage, "Created Task", admin);
            SendEmail(NotificationMessage, "Created Task", email);
          } else if (assignee == null) {
            NotificationMessage = await CreateNotification(
              "Unassigned Task",
              savedTask.assignee,
              savedTask.title
            );
            const user = await User.find();
            user.forEach((element) => {
              savedTask.assignee = element;
            });
            const { email } = await User.findById(savedTask.assignee);
            SendEmail(NotificationMessage, "Created Task", email);
          }

          return res.status(201).send({
            successful: true,
            message: `Successfully added Task: ${savedTask.title}`,
            task: {
              id: savedTask._id,
              status: savedTask.status,
            },
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
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    let tasks = await Task.find().populate("assignee", "first_name last_name");

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { title, description, priorityLevel, assignee, dueDate, status } =
    req.body;
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return handleTaskMethod(res, task, "");
    }

    if (!assignee || assignee.trim() === "" || assignee == "None") {
      task.assignee = null;
      task.status = "Unassigned";
    } else if (status === "In progress") {
      task.assignee = assignee;
      task.status = "In progress";
    } else {
      task.assignee = assignee;
      task.status = "To do";
    }

    task.title = title;
    task.description = description;
    task.priorityLevel = priorityLevel;
    task.dueDate = dueDate;

    const taskUpdate = await task.save();

    await taskUpdate.populate("assignee", "email");

    const notificationMessage = await CreateNotification(
      "Update Task",
      taskUpdate.assignee,
      taskUpdate.title
    );

    if (taskUpdate.assignee && taskUpdate.assignee.email) {
      SendEmail(
        notificationMessage,
        "Updated Status",
        taskUpdate.assignee.email
      );
    } else {
      const users = await User.find();
      const emailPromises = users.map(async (user) => {
        if (user.email) {
          await SendEmail(notificationMessage, "Updated Task", user.email);
        }
      });
      await Promise.all(emailPromises);
    }

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
    const status = req.body.status;
    const user = req.user.userId;
    const dateToday = new Date().toISOString().split("T")[0];

    if (!status) {
      return res.status(404).send({
        successful: false,
        message: "Status is required",
      });
    }

    if (status == "Unassigned") {
      updatedStats.status = "To do";
      updatedStats.isClaimed = true;
      updatedStats.assignee = user;
    }
    if (status == "To do") {
      updatedStats.status = "In progress";
      updatedStats.startedAt = dateToday;
    }
    if (status == "In progress") {
      updatedStats.status = "Completed";
      updatedStats.completedAt = dateToday;
    }

    updatedStats = await updatedStats.save();

    await updatedStats.populate("assignee", "email");

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

    handleTaskMethod(res, updatedStats, "Updated status of");
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
    const category = parseInt(req.query.category, 10);
    let sortCat = "";
    let sortValue = 0;

    // CATEGORY:
    // 1 - latest task - descending
    // 2 - oldest task - ascending
    // 3 - high priority - descending
    // 4 - low priority - ascending
    // 5 - due date - descending

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

    let tasks = await Task.find().populate("assignee", "first_name last_name");

    if (sortCat === "priorityLevel") {
      const priorityOrder = {
        Neutral: 1,
        High: 2,
        Urgent: 3,
      };

      tasks.sort((a, b) => {
        const aPriority = priorityOrder[a.priorityLevel];
        const bPriority = priorityOrder[b.priorityLevel];
        return (aPriority - bPriority) * sortValue;
      });
    } else {
      tasks = await Task.find()
        .sort({ [sortCat]: sortValue })
        .populate("assignee", "first_name last_name");
    }

    handleTaskMethod(res, tasks, "sorted");
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
      .populate("assignee", "first_name last_name");

    if (tasks.length === 0) {
      const partialTasks = await Task.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // Partial search on title
          { description: { $regex: query, $options: "i" } }, // Partial search on description
        ],
      }).populate("assignee", "first_name last_name");

      return res
        .status(200)
        .json({ count: partialTasks.length, data: partialTasks });
    } else {
      return res.status(200).json({ count: tasks.length, data: tasks });
    }
  } catch (error) {
    console.error("Search Task Error:", error);
    res.status(500).send("An error occurred while searching for tasks.");
  }
};

async function emailForAdmin() {
  try {
    const admin = await User.find();
    let id;

    admin.forEach((element) => {
      if (element.isAdmin == true) {
        id = element.email;
      }
    });

    return id;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  updateStatus,
  deleteTask,
  sortBy,
  filterTasks,
  getTotalcompletedofuser,
  getHistoryLogs,
  searchTasks,
};
