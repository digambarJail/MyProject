const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './env'
})
// const URI = "mongodb://127.0.0.1:27017/mern";
// const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("COnecction SUccessful")
    } catch (error) {
        console.log("DB COnnecttion failed",error)
        process.exit(1);
    }
}

module.exports = connectDB;