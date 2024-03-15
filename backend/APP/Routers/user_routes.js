const express = require('express');
const {addUser, getAllUsers, LoginUser} = require('../Controllers/userController');
const router = express.Router();

const { getAllTaskAdmin, getUnassignedTask, getTask , getCompletedTaskDateRange, exportDataAsExcel} = require('../Controllers/userTaskController')
const {VerifyToken} = require('../Controllers/userController')



router.post('/add', addUser)

router.get('/', getAllUsers)





// For testing Only need to fix
router.get('/getTaskAdmin/:count', getAllTaskAdmin)
router.get('/getTaskAdmin/', getAllTaskAdmin)
router.get('/unassignedTask/', getUnassignedTask)
router.get('/unassignedTask/:count', getUnassignedTask)



router.get('/toDoTask/', getTask)
router.get('/toDoTask/:id', getTask)

router.get('/getCompletedTask', getCompletedTaskDateRange)

router.get('/exportAsExcel', exportDataAsExcel)

router.post('/login', LoginUser);


module.exports = router;