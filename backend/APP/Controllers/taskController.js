const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json({ tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priorityLevel, assingee, dueDate, status } =
    req.body;

  const task = new Task({
    title: title,
    description: description,
    priorityLevel: priorityLevel,
    assingee: assingee,
    dueDate: dueDate,
    status: status,
  });

  task
    .save()
    .then((result) => {
      res.status(200).send({
        successful: true,
        message: `Succesfully added Task: ${result.title}`,
      });
    })
    .catch((error) => {
      res.status(500).send({
        successful: false,
        message: error.message,
      });
    });
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, priorityLevel, assingee, dueDate, status } = req.body;
    let task = await Task.findOneAndUpdate({ _id: req.params.id });
    if (task === null) {
      res.status(404).send({
        successful: false,
        message: "Task does not exist",
      });
    } else {
      task = {
        title: title,
        description: description,
        priorityLevel: priorityLevel,
        assingee: assingee,
        dueDate: dueDate,
        status: status,
      };
      task
        .save()
        .then((result) => {
          res.status(200).send({
            successful: true,
            message: "Successfully updated Task.",
          });
        })
        .catch((err) => {
          res.status(500).send({
            successful: false,
            message: err.message,
          });
        });
    }
  } catch (err) {
    res.status(500).send({
      successful: false,
      message: err.message,
    });
  }
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
};
