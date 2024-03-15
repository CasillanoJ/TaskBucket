// const mongoose = require("mongoose");
const Task = require("../Models/task_model");


const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const createTask = async (req, res) => {
  const { title, description, priorityLevel, assignee, dueDate, status } =
    req.body;

    

  try {
    const task = new Task({
      title,
      description,
      priorityLevel,
      assignee,
      dueDate,
      status,
    });

    if (!assignee) {
      res.status(401).send({
        successful: false,
        message: `ID: ${assignee} is not found`,
      });
    }

    if (assignee == null) {
      task.status = "Unassigned";
    } else {
      task.status = "To-do";
    }

    const savedTask = await task.save();

    res.status(201).send({
      successful: true,
      message: `Successfully added Task: ${savedTask.title}`,
      task: savedTask._id,
    });
  } catch (error) {
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
      filter.priorityLevel = req.body.priorityLevel;
    }

    if (req.body.status) {
      filter.status = req.body.status;
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
    let category = parseInt(req.query.category);
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
      successful: true,
      message: `Successfully ${str} Task.`,
      id: action._id,
    });
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  updateStatus,
  isClaimed,
  deleteTask,
  sortBy,
  filterTasks,
};
