const express = require("express");
const router = express.Router();

const { getTasks, createTask, updateTask, sortBy, filterTasks } = require('../Controllers/taskController');

router.route("/").get(getTasks).post(createTask);
router.get('/sortBy/', sortBy)
router.get('/filter/', filterTasks)
router.put("/:id", updateTask)

module.exports = router;
