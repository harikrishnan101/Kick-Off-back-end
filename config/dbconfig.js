

  const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://harikrishnan183hari:0qNcWKAGCveVJT82@cluster0.psz4owe.mongodb.net/`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
