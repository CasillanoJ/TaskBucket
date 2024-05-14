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
} = require("../Controllers/taskController");

const { getEachUserProgression } = require("../Controllers/userTaskController");
const { VerifyToken } = require("../Controllers/Authentication_Controller");

router.use(VerifyToken);
router.post("/", createTask);
router.get("/sortBy/", sortBy);
router.get("/filter/", filterTasks);
router.put("/:id", updateTask);
router.put("/stats/:id", updateStatus);
router.put("/claim/:id", isClaimed);

router.post("/data", getTasks);

router.get("/getProgress", getEachUserProgression);

module.exports = router;
