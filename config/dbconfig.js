const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      
        const mongoURI = 'mongodb+srv://harikrishnan183hari:0qNcWKAGCveVJT82@cluster0.psz4owe.mongodb.net/';

        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        
        process.exit(1);
    }
};

module.exports = connectDB;
