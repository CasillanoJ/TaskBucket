const express = require("express");
const router = express.Router();

const {getEachUserProgression} = require('../Controllers/userTaskController')
const { getTasks, createTask, updateTask, sortBy, filterTasks, updateStatus, isClaimed } = require('../Controllers/taskController');
const {VerifyToken} = require('../Controllers/userController')

router.route("/").get(getTasks).post(createTask);
router.get('/sortBy/', sortBy)
router.get('/filter/', filterTasks)
router.put("/:id", updateTask)
router.put("/stats/:id", updateStatus);
router.put("/claim/:id", isClaimed)

router.get('/getProgress',VerifyToken, getEachUserProgression)


module.exports = router;
