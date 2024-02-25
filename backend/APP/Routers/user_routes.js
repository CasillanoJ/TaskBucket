const express = require('express');
const {addUser, getAllUsers} = require('../Controllers/userController');
const router = express.Router();

const { getAllTaskAdmin, getUnassignedTask, getTask} = require('../Controllers/userTaskController')


router.post('/add', addUser)

router.get('/', getAllUsers)





// For testing Only need to fix
router.get('/getTaskAdmin/:count', getAllTaskAdmin)
router.get('/getTaskAdmin/', getAllTaskAdmin)
router.get('/unassignedTask/', getUnassignedTask)
router.get('/unassignedTask/:count', getUnassignedTask)


router.get('/toDoTask/', getTask)
router.get('/toDoTask/:id', getTask)



module.exports = router;