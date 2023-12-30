var express = require('express');
const { RegisterNewCourt } = require('../Controllers/UserController');
var router = express.Router();

/* GET users listing. */
router.post('/CourtRegister',RegisterNewCourt)

module.exports = router;
