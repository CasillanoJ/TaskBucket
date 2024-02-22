const express = require("express");
const router = express.Router();

const { getTasks, createTask, updateTask } = require('../Controllers/taskController');

router.route("/").get(getTasks).post(createTask);
router.put("/:id", updateTask)

module.exports = router;
