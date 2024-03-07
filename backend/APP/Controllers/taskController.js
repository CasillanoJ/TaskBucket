// const mongoose = require("mongoose");
const Task = require("../Models/task_model");

const getTasks = async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json({ tasks });
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

    const savedTask = await task.save();

    res.status(201).send({
      successful: true,
      message: `Successfully added Task: ${savedTask.title}`,
      task: savedTask,
    });
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, priorityLevel, assignee,status, dueDate } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        description,
        priorityLevel,
        assignee,
        dueDate,
        status
      },
      { new: true }
    );
    
    handleTaskMethod(res, updatedTask, "updated");
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

const startTask = async (req, res) => {
  try {
    const startedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { status: "In Progress" }
    );
    
    handleTaskMethod(res, startedTask, "started");
  } catch (err) {
    res.status(500).send({
      successful: false,
      message: err.message,
    });
  }
};

const todoTask = async (req, res) => {
  try {
    const todo = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { status: "To-do" }
    );
    
    handleTaskMethod(res, todo, "to-do");
  } catch (err) {
    res.status(500).send({
      successful: false,
      message: err.message,
    });
  }
};

const completeTask = async (req, res) => {
  try {
    const completedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { status: "Completed" }
    );

    handleTaskMethod(res, completedTask, "completed");
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
      action,
    });
  }
}

const getTotalcompletedofuser = async (req, res) => {

  const { userId, startDate, endDate } = req.query;

  try {
    
    const user = await User.findById(userId);

    if(!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const tasks = await Task.find({ 
      assignee: userId,
      status: "Completed",
      dueDate: {
        $gte: startDate,
        $lte: endDate  
      }
    });

    res.json({
      message: `${user.first_name} has completed ${tasks.length} tasks`,
      data: tasks
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }

}

const getHistoryLogs = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const tasks = await Task.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  startTask,
  todoTask,
  completeTask,
  getTotalcompletedofuser,
  getHistoryLogs,
};
