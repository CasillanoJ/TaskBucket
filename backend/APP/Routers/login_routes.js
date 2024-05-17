const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const {addUser, LoginUser, GetChangePasswordCode, VerifiyCode} = require('../Controllers/userController');

router.post('/login', LoginUser);
router.post('/register', addUser)
router.post('/verifyEmail',GetChangePasswordCode)
router.post('/verifyCode',VerifiyCode)



=======
const {addUser, LoginUser} = require('../Controllers/userController');

router.post('/login', LoginUser);
router.post('/register', addUser)
>>>>>>> origin/backend/frontend/merge


module.exports = router;