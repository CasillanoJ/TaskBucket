const express = require("express");
const router = express.Router();

const { getTasks, createTask, updateTask,getTotalcompletedofuser,getHistoryLogs} = require('../Controllers/taskController');

router.route("/").get(getTasks).post(createTask);
router.put("/:id", updateTask);
router.route("/completed/:userId").get(getTotalcompletedofuser);
router.get("/logs", getHistoryLogs); 


module.exports = router;