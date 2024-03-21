var express = require('express');
const { signUp,login } = require('../Controllers/auth');

var router = express.Router();



router.post('/register',signUp)
router.post('/login',login)

module.exports=router

