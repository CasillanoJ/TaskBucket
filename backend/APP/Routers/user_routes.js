const express = require('express');
const {getAllUsers, changePassword, LogoutUser} = require('../Controllers/userController');


const router = express.Router();

const { getTaskList,  exportDataAsExcel} = require('../Controllers/userTaskController')
const {VerifyUser} = require('../Controllers/userController')
const {VerifyToken} = require('../Controllers/Authentication_Controller')



router.use(VerifyToken)

router.get('/', getAllUsers)

// For testing Only need to fix
router.post('/getTaskList/:count', getTaskList)




router.get('/exportAsExcel', exportDataAsExcel)

router.post('/changePassword' ,changePassword)

router.post('/verfiyUser', VerifyUser)

router.post('/logout',LogoutUser)

module.exports = router;