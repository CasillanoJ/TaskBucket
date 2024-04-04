const express = require('express');
const {getAllUsers, changePassword} = require('../Controllers/userController');


const router = express.Router();

const { getTaskList, getUnassignedTask, getTask , getCompletedTaskDateRange, exportDataAsExcel} = require('../Controllers/userTaskController')
const {VerifyToken, VerifyUser} = require('../Controllers/userController')


router.use(VerifyToken)

router.get('/', getAllUsers)

// For testing Only need to fix
router.get('/getTaskList/:count', getTaskList)
router.get('/unassignedTask/', getUnassignedTask)
router.get('/unassignedTask/:count', getUnassignedTask)


router.get('/toDoTask', getTask)

router.get('/getCompletedTask', getCompletedTaskDateRange)

router.get('/exportAsExcel', exportDataAsExcel)

router.post('/changePassword' ,changePassword)

router.post('/verfiyUser', VerifyUser)



module.exports = router;