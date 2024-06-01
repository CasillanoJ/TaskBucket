const express = require('express');
const {
  getAllVerifiedUsers,
  getAllUnverifiedUsers,
  changePassword,
  LogoutUser,
  RejectUser,
} = require("../Controllers/userController");


const router = express.Router();

const { getTaskList,  exportDataAsExcel, GetAllTaskProgress} = require('../Controllers/userTaskController')
const {VerifyUser} = require('../Controllers/userController')
const {VerifyToken} = require('../Controllers/Authentication_Controller')
const { getTask} = require('../Controllers/userTaskController')
const{GetUser} = require('../Controllers/userController')



router.use(VerifyToken)

router.post("/", getAllVerifiedUsers);
router.post("/unverified", getAllUnverifiedUsers);

// For testing Only need to fix
router.post('/getTaskList/:count', getTaskList)




router.get('/exportAsExcel', exportDataAsExcel)

router.post('/changePassword' ,changePassword)

router.post('/verifyUser', VerifyUser)
router.post('/rejectUser', RejectUser)

router.post('/logout',LogoutUser)

router.post('/getTask',getTask)

router.post('/getTotalProgression', GetAllTaskProgress)
router.get('/getSpecificUser' , GetUser)
module.exports = router;