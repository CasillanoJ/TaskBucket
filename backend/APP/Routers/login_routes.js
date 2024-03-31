const express = require('express');
const router = express.Router();
const {addUser, LoginUser} = require('../Controllers/userController');

router.post('/login', LoginUser);
router.post('/register', addUser)


module.exports = router;