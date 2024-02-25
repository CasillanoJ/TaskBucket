const express = require('express');
const {
  addUser,
  getAllUsers,
  changePassword,
} = require('../Controllers/userController');
const router = express.Router();
const {
  getUserTask,
  getTaskAdmin,
} = require('../Controllers/userTaskController');

router.post('/add', addUser);
router.get('/', getAllUsers);
router.get('/getTask/:id', getUserTask);
// For testing Only need to fix
router.get('/getTaskAdmin', getTaskAdmin);
router.post('/change-password', changePassword);

module.exports = router;