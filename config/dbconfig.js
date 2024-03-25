const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      
      const conn = await mongoose.connect(`mongodb+srv://harikrishnan183hari:cybdNs6qwbWEL04e@cluster0.zmo7ovh.mongodb.net/`);
      // const conn = await mongoose.connect(`mongodb://localhost:27017/KickOff`);
      
      console.log(`connectDatabase`);
    } catch (error) {
      console.error(error.message);
      
    }
  }
  module.exports = connectDB;  
  