var express = require('express');
const { RegisterNewCourt,getMyCourtData, getSingleCourtData } = require('../Controllers/UserController');
const { userAuth } = require('../Middlwware/userAuth');

var router = express.Router();

/* GET users listing. */
router.post('/CourtRegister',userAuth,RegisterNewCourt)
router.get('/getMyCourtData',userAuth,getMyCourtData)
router.get('/getSingleCourtData',userAuth,getSingleCourtData)
module.exports = router;
