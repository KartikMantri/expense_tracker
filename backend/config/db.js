// Import mongoose library
const mongoose = require('mongoose');

// CONNECTION FUNCTION: This connects our Express app to MongoDB Atlas
const connectDB = async () => {
    try {
        // mongoose.connect() attempts to connect to the database
        // process.env.MONGO_URI reads the connection string from our .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // If successful, log the host name (where the database is located)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If connection fails, log the error and exit the process
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure code
    }
};

// Export the function so we can use it in index.js
module.exports = connectDB;
