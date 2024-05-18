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

const { getEachUserProgression } = require("../Controllers/userTaskController");
const { VerifyToken } = require("../Controllers/Authentication_Controller");

router.use(VerifyToken);
router.post("/add", createTask);
router.post("/", getTasks);
router.get("/sortBy/", sortBy);
router.post("/filter/", filterTasks);
router.get("/search/", searchTasks);
router.put("/:id", updateTask);
router.put("/stats/:id", updateStatus);
router.put("/claim/:id", isClaimed);

router.get('/getProgress', getEachUserProgression)

module.exports = router;
