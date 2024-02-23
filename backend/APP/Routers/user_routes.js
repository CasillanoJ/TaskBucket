const express = require('express');
const {addUser, getAllUsers} = require('../Controllers/userController');
const router = express.Router();

const {getUserTask} = require('../Controllers/userTaskController')


router.post('/add', addUser)

router.get('/', getAllUsers)

router.get('/getTask/:id',getUserTask)


module.exports = router;