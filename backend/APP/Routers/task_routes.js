const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const {getTasks, createTask, sortBy, filterTasks, updateTask, updateStatus, isClaimed} = require('../Controllers/taskController')

const {getEachUserProgression} = require('../Controllers/userTaskController')
const {VerifyToken} = require('../Controllers/Authentication_Controller')


router.use(VerifyToken)
router.route("/").get(getTasks).post(createTask);
router.get('/sortBy/', sortBy)
router.get('/filter/', filterTasks)
router.put("/:id",updateTask)
=======
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
>>>>>>> origin/backend/frontend/merge
router.put("/stats/:id", updateStatus);
router.put("/claim/:id", isClaimed);

<<<<<<< HEAD
router.get('/getProgress', getEachUserProgression)
=======
router.get("/getProgress", getEachUserProgression);
>>>>>>> origin/backend/frontend/merge

module.exports = router;
