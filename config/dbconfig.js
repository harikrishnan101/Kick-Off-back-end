const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      
      // const conn = await mongoose.connect(`mongodb://localhost:27017/KickOff`);
      const conn = await mongoose.connect(`mongodb+srv://harikrishnan183hari:0qNcWKAGCveVJT82@cluster0.psz4owe.mongodb.net/`);
      
      console.log(`connectDatabase`);
    } catch (error) {
      console.error(error.message);
      
    }
  }
  module.exports = connectDB;  
  