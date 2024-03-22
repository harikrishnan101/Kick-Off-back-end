const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://harikrishnan183hari:0qNcWKAGCveVJT82@cluster0.psz4owe.mongodb.net/`);
      console.log(`connectDB`);
    } catch (error) {
      console.error(error.message);
      
    }
  }
  module.exports = connectDB;  