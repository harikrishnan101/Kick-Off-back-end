const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://harikrishnan183hari:JGx87WyGgBtFDqll@cluster0.2xl5e0i.mongodb.net/`);
      
      // const conn = await mongoose.connect(`mongodb://localhost:27017/KickOff`);
      
      console.log(`connectDatabase`);
    } catch (err) {
      console.error(err.message);
      
    }
  }
  module.exports = connectDB;  
  