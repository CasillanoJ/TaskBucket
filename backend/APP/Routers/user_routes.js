const express = require('express');
const userController = require('../Controllers/userController');
const router = express.Router();


router.post('/add', userController.addUser)

router.get('/', userController.getAllUsers)


module.exports = router;