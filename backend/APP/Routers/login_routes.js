const express = require('express');
const router = express.Router();
const {addUser, LoginUser, GetChangePasswordCode, VerifiyCode} = require('../Controllers/userController');

router.post('/login', LoginUser);
router.post('/register', addUser)
router.post('/verifyEmail',GetChangePasswordCode)
router.post('/verifyCode',VerifiyCode)





module.exports = router;