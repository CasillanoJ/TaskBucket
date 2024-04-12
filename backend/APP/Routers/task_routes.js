const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  sortBy,
  filterTasks,
  updateTask,
  updateStatus,
  isClaimed,
  searchTasks,
} = require("../Controllers/taskController");

const {getEachUserProgression} = require('../Controllers/userTaskController')
const {VerifyToken} = require('../Controllers/userController')


router.use(VerifyToken)
router.route("/").get(getTasks).post(createTask);
router.get('/sortBy/', sortBy)
router.get('/filter/', filterTasks)
router.get("/search", searchTasks);
router.get("/getProgress", getEachUserProgression);

router.put("/:id",updateTask)
router.put("/stats/:id", updateStatus);
router.put("/claim/:id", isClaimed)

module.exports = router;