const express = require('express');
const {addUser, getAllUsers} = require('../Controllers/userController');
const router = express.Router();

const {getUserTask, getAllTaskAdmin, getUnassignedTask, getTodoTask} = require('../Controllers/userTaskController')


router.post('/add', addUser)

router.get('/', getAllUsers)

router.get('/getTask/:id',getUserTask)



// For testing Only need to fix
router.get('/getTaskAdmin/:count', getAllTaskAdmin)
router.get('/getTaskAdmin/', getAllTaskAdmin)
router.get('/unassignedTask/', getUnassignedTask)
router.get('/unassignedTask/:count', getUnassignedTask)


router.get('/toDoTask/', getTodoTask)
router.get('/toDoTask/:id', getTodoTask)



module.exports = router;