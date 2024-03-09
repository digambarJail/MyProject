// Connecting to MONGODB Atlas
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './env'
})

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Connection Successful!")
    } catch (error) {
        console.log("DB Connection failed",error)
        process.exit(1);
    }
}

module.exports = connectDB;