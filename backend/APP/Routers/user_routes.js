const express = require('express');
const {addUser, getAllUsers, LoginUser} = require('../Controllers/userController');


const router = express.Router();

const { getTaskList, getUnassignedTask, getTask , getCompletedTaskDateRange, exportDataAsExcel} = require('../Controllers/userTaskController')
const {VerifyToken} = require('../Controllers/userController')


router.use(VerifyToken)

router.get('/', getAllUsers)

// For testing Only need to fix
router.get('/getTaskList/:count', getTaskList)
router.get('/unassignedTask/', getUnassignedTask)
router.get('/unassignedTask/:count', getUnassignedTask)



router.get('/toDoTask', getTask)

router.get('/getCompletedTask', getCompletedTaskDateRange)

router.get('/exportAsExcel', exportDataAsExcel)



module.exports = router;