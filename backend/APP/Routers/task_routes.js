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
  deleteTask,
} = require("../Controllers/taskController");

const { getEachUserProgression } = require("../Controllers/userTaskController");
const { VerifyToken } = require("../Controllers/Authentication_Controller");

router.use(VerifyToken);
router.post("/add", createTask);
router.post("/", getTasks);
router.post("/sortBy/", sortBy);
router.post("/filter/", filterTasks);
router.get("/search/", searchTasks);
router.post("/:id", updateTask);
router.post("/stats/:id", updateStatus);

router.post('/getProgress/:id', getEachUserProgression)
router.post('/deleteTask/:id', deleteTask)

module.exports = router;
