const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB connection string
        const mongoURI = 'mongodb+srv://ramu:njhghv cbasb6766787y8xm VGFC@cluster0.psz4owe.mongodb.net/';

        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        // Terminate the process if unable to connect to the database
        process.exit(1);
    }
};

module.exports = connectDB;
