var express = require('express');
const { RegisterNewCourt,getMyCourtData,addCourtTiming, getSingleCourtData,getLatestUpdateDate,getAllCourtData,getslotData, getMyBookings,getCourtTimeData} = require('../Controllers/UserController');

const { paymentsuccess , payments} = require('../Controllers/payment');
const { AdminAuth } = require('../Middlwware/adminAuth');


var router = express.Router();

/* GET users listing. */
router.post('/CourtRegister',AdminAuth,RegisterNewCourt)
router.get('/getMyCourtData',AdminAuth,getMyCourtData)
router.get('/getSingleCourtData',AdminAuth,getSingleCourtData)
router.post('/addCourtTiming',AdminAuth,addCourtTiming)
router.get('/getLatestUpdateDate',AdminAuth,getLatestUpdateDate)
router.get('/getAllCourtData',AdminAuth,getAllCourtData)
router.get('/getslotData',AdminAuth,getslotData)
router.post('/payments',AdminAuth,payments)
router.post('/paymentsuccess',AdminAuth,paymentsuccess)
router.get('/getMyBookings',AdminAuth,getMyBookings) 
router.get('/getCourtTimeData',AdminAuth,getCourtTimeData)

module.exports = router;
