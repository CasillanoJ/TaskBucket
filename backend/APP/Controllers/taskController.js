// const mongoose = require("mongoose");
const Task = require("../Models/task_model");

const getTasks = async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  const { title, description, priorityLevel, assignee, dueDate, status } =
    req.body;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0)

  const inputValue = new Date(dueDate);
  inputValue.setHours(0, 0, 0, 0);
  ;

  try {
    const task = new Task({
      title,
      description,
      priorityLevel,
      assignee,
      dueDate,
      status,
    });

    if (dueDate != null) {

      if (inputValue <= currentDate) {
        res.status(400).send({
          successful: false,
          message: "Date must be the current date or in the future"
        })
      }
      else {
        const savedTask = await task.save();

        res.status(201).send({
          successful: true,
          message: `Successfully added Task: ${savedTask.title}`,
          task: savedTask,
        });
      }
    }

    else {


      const savedTask = await task.save();

      res.status(201).send({
        successful: true,
        message: `Successfully added Task: ${savedTask.title}`,
        task: savedTask,
      });
    }
  } catch (error) {
    res.status(500).send({
      successful: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const { title, description, priorityLevel, assignee, status, dueDate } = req.body;
=======
    const { title, description, priorityLevel, assignee, status, dueDate } =
      req.body;
>>>>>>> Stashed changes

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        description,
        priorityLevel,
        assignee,
        dueDate,
        status,
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

    let category = parseInt(req.query.category)
    let sortCat = ""
    let sortValue = 0

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
        sortValue = -1
        break;
      case 2:
      case 4:
        sortValue = 1
        break;
      default:
        sortValue = 1
        break;
    }

    switch (category) {
      case 1:
      case 2:
        sortCat = "createdAt"
        break;
      case 3:
      case 4:
        sortCat = "priorityLevel"
        break;
      case 5:
        sortCat = "dueDate"
        break;
      default:
        sortCat = "createdAt"
        break;
    }

    // console.log(sortValue)
    // console.log(sortCat)

    var sort = {};
    sort[sortCat] = sortValue;

    const sortedTask = await Task.find(

    ).sort(sort);

    //.sort(`{${sortCat}: ${sortValue}}`);

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
      action,
    });
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
  sortBy,
  filterTasks
};
