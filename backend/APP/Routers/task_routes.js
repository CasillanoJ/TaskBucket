const express = require("express");
const router = express.Router();

const { getTasks, createTask, updateTask } = require('../Controllers/taskController');
const {getEachUserProgression} = require('../Controllers/userTaskController')

router.route("/").get(getTasks).post(createTask);
router.put("/:id", updateTask)

router.get('/getProgress', getEachUserProgression)


module.exports = router;
