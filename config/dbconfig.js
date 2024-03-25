

const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      const mongoURI = 'mongodb+srv://harikrishnan183hari:0qNcWKAGCveVJT82@cluster0.psz4owe.mongodb.net/';
      
      
      console.log(`connectDatabase`);
    } catch (error) {
      console.error(error.message);
      
    }
  }
  module.exports = connectDB;

