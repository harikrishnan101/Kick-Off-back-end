
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
    
   }

    
}

const login= async (req,res)=>{
try {
  const user= await USER.findOne({email:req.body.email})
  
  
  if(user){
   bcrypt.compare(req.body.password, user.password, function(err,resp) {
    if(resp){
      const token = jwt.sign({ userId:user._id,email:user.email,firstname:user.firstname,lastname:user.lastname,role:user.role},process.env.JWT_KEY, {
        expiresIn: '2d'
       
    })
    user.password = undefined;
user.ConfirmPassword = undefined;
   
      res.status(200).json({ login: true, token:token,user:user});
    } else {
      res.status(403).json({ login: false, message: 'Invalid credentials' });
    }
  });
  }
} catch (error) {
  
}
}

module.exports={signUp,login}