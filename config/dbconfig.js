const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://harikrishnan183hari:0qNcWKAGCveVJT82@cluster0.zmo7ovh.mongodb.net/`);
      
      // const conn = await mongoose.connect(`mongodb://localhost:27017/KickOff`);
      
      console.log(`connectDatabase`);
    } catch (err) {
      console.error(err.message);
      
    }
  }
  module.exports = connectDB;  
  