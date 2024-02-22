const express = require('express');
const {addUser, getAllUsers} = require('../Controllers/userController');
const router = express.Router();


router.post('/add', addUser)

router.get('/', getAllUsers)


module.exports = router;