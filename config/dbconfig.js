const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://harikrishnan183hari:a9HrDRjoSt6qYO7f@cluster0.dfl6mte.mongodb.net/`);
      
      // const conn = await mongoose.connect(`mongodb://localhost:27017/KickOff`);
      
      console.log(`connectDatabase`);
    } catch (err) {
      console.error(err.message);
      
    }
  }
  module.exports = connectDB;  
  