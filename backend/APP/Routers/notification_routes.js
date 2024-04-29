const express = require("express");
const router = express.Router();

const {VerifyToken} = require('../Controllers/Authentication_Controller')
const {GetNotification, ReadNotification} = require('../Controllers/notificationController')

router.use(VerifyToken)
router.get('/get', GetNotification)
router.post('/read', ReadNotification)


module.exports = router;
