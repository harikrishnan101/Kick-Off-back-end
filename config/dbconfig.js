

  const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://harikrishnan183hari:0qNcWKAGCveVJT82@cluster0.psz4owe.mongodb.net/`, {
        
        useNewUrlParser: true,
      });
      console.log(`connectDB`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  module.exports = connectDB;  