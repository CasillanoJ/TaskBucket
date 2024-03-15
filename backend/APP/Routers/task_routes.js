const express = require("express");
const router = express.Router();

const {getEachUserProgression} = require('../Controllers/userTaskController')
const {VerifyToken} = require('../Controllers/userController')
const { getTasks, createTask, updateTask, sortBy, filterTasks, updateStatus, isClaimed,getTotalcompletedofuser,getHistoryLogs} = require('../Controllers/taskController');

router.route("/").get(getTasks).post(createTask);
router.get('/sortBy/', sortBy)
router.get('/filter/', filterTasks)
router.put("/:id", updateTask);
router.route("/completed/:userId").get(getTotalcompletedofuser);
router.get("/logs", getHistoryLogs); 

router.put("/stats/:id", updateStatus);
router.put("/claim/:id", isClaimed)

router.get('/getProgress',VerifyToken, getEachUserProgression)


module.exports = router;