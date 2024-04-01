
const USER=require('../Models/UserModel')
const bcrypt = require('bcrypt'); 
// const { response } = require('../app');

var jwt = require('jsonwebtoken');

const saltRounds=process.env.saltRounds

const signUp = async (req, res) => {
  try {
    
    const existingUser = await USER.findOne({ email: req.body.email.trim() });
    if (existingUser) {
      return res.status(400).json({ signUp: false, message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(saltRounds);

    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new USER({
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      email: req.body.email.trim(),
      password: hash.trim(),
      ConfirmPassword: hash.trim() 
    });


    const savedUser = await newUser.save();
    res.status(200).json({ signUp: true });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ signUp: false, message: 'Internal server error' });
  }
}



const login =async (req, res) => {
  try {
    const user = await USER.findOne({ email: req.body.email });

    if (user) {
     
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          
          const token = jwt.sign({
            userId: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role
          }, process.env.JWT_KEY, {
            expiresIn: '2d'
          });

         
          user.password = undefined;
          user.ConfirmPassword = undefined;

          res.status(200).json({ login: true, token: token, user: user });
        } else {
          
          res.status(403).json({ login: false, message: 'Invalid credentials' });
        }
      });
    } else {
      
      res.status(404).json({ login: false, message: 'User not found' });
    }
  } catch (error) {
    
    console.error('Login failed:', error);
    res.status(500).json({ login: false, message: 'Internal server error' });
  }
}

module.exports={signUp,login}