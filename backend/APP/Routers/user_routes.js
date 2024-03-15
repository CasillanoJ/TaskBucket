const express = require('express');
const {
  addUser,
  getAllUsers,
  changePassword,
} = require('../Controllers/userController');
const router = express.Router();
const { getAllTaskAdmin, 
  getUnassignedTask,
  getTask , getCompletedTaskDateRange, exportDataAsExcel,
} = require('../Controllers/userTaskController');

router.post('/add', addUser)

router.get('/', getAllUsers)





// For testing Only need to fix
router.get('/getTaskAdmin/:count', getAllTaskAdmin)
router.get('/getTaskAdmin/', getAllTaskAdmin);
router.post('/change-password', changePassword);router.get('/unassignedTask/', getUnassignedTask)
router.get('/unassignedTask/:count', getUnassignedTask)



router.get('/toDoTask/', getTask)
router.get('/toDoTask/:id', getTask)

router.get('/getCompletedTask', getCompletedTaskDateRange)

router.get('/exportAsExcel', exportDataAsExcel)


module.exports = router;