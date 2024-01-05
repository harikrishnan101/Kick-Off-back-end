var express = require('express');
const { RegisterNewCourt,getMyCourtData,addCourtTiming, getSingleCourtData,getLatestUpdateDate} = require('../Controllers/UserController');
const { userAuth } = require('../Middlwware/userAuth');

var router = express.Router();

/* GET users listing. */
router.post('/CourtRegister',userAuth,RegisterNewCourt)
router.get('/getMyCourtData',userAuth,getMyCourtData)
router.get('/getSingleCourtData',userAuth,getSingleCourtData)
router.post('/addCourtTiming',userAuth,addCourtTiming)
router.get('/getLatestUpdateDate',userAuth,getLatestUpdateDate)
module.exports = router;
