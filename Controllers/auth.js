
const USER=require('../Models/UserModel')
const bcrypt = require('bcrypt'); 
// const { response } = require('../app');

var jwt = require('jsonwebtoken');

const saltRounds=process.env.saltRounds

const signUp=(req,res)=>{
  
  try {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
         
            
            USER({firstname:req.body.firstname.trim(),lastname:req.body.lastname.trim(),email:req.body.email.trim(),password:hash.trim(),ConfirmPassword:hash.trim()}).save().then((response)=>{
               res.status(200).json({signUp:true });
            })

        });
    });
  } catch (error) {
   res.status(502).json({signUp:false });
   
  }}


const login = async (req, res) => {
  try {
    const user = await USER.findOne({ email: req.body.email });

    if (user) {
      // Compare the provided password with the hashed password stored in the database
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          // Passwords match, generate JWT token for authentication
          const token = jwt.sign({
            userId: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role
          }, process.env.JWT_KEY, {
            expiresIn: '2d'
          });

          // Clear password and ConfirmPassword fields before sending the user object in the response
          user.password = undefined;
          user.ConfirmPassword = undefined;

          res.status(200).json({ login: true, token: token, user: user });
        } else {
          // Passwords do not match, send an error response
          res.status(403).json({ login: false, message: 'Invalid credentials' });
        }
      });
    } else {
      // User with the provided email not found, send an error response
      res.status(404).json({ login: false, message: 'User not found' });
    }
  } catch (error) {
    // Handle other potential errors
    console.error('Login failed:', error);
    res.status(500).json({ login: false, message: 'Internal server error' });
  }
}

module.exports={signUp,login}