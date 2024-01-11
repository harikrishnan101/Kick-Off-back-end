var express = require('express');
const { RegisterNewCourt,getMyCourtData,addCourtTiming, getSingleCourtData,getLatestUpdateDate,getAllCourtData,getslotData} = require('../Controllers/UserController');
const { VendorAuth } = require('../Middlwware/Vendor');
const { paymentsuccess , payments} = require('../Controllers/payment');


var router = express.Router();

/* GET users listing. */
router.post('/CourtRegister',VendorAuth,RegisterNewCourt)
router.get('/getMyCourtData',VendorAuth,getMyCourtData)
router.get('/getSingleCourtData',VendorAuth,getSingleCourtData)
router.post('/addCourtTiming',VendorAuth,addCourtTiming)
router.get('/getLatestUpdateDate',VendorAuth,getLatestUpdateDate)
router.get('/getAllCourtData',VendorAuth,getAllCourtData)
router.get('/getslotData',VendorAuth,getslotData)

router.post('/payments',payments)
router.post('/paymentsuccess',VendorAuth,paymentsuccess)
module.exports = router;
