const jwt = require('jsonwebtoken');
const court = require('../Models/CourtSchema');

const userAuth = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ');
    jwt.verify(token[1], process.env.JWT_KEY, (err, decodedToken) => {
       
      if (err || !decodedToken || !decodedToken.userId) {
        res.status(401).json({ message: "Unauthorized request" });
      } else {
        req.userId = decodedToken.userId;
        if (decodedToken.role === 2 || decodedToken.role === 3) {
          next();
        } else {
          res.status(401).json({ message: "Unauthorized request" });
        }
      }
    });
  } catch (error) {
    res.status(403).json({ message: "Something went wrong" });
  }
};


module.exports = {userAuth};
