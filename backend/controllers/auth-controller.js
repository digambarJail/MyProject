const User = require('../models/user-model');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer'); 

dotenv.config({
    path: './env'
});

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB Atlas");
})
.catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
});

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.resolve(__dirname, '..', 'images');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

const posts = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users); // Send the data as response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Register endpoint with file upload 
const register = async (req, res) => {
    try {
        console.log("Inside register try");
        const { email, password, name } = req.body;
        const prof_pic = req.file ? req.file.path : ''; // Get the file path from the uploaded image
        console.log("Path:  ",prof_pic);
        console.log("req.body destructured");

        const userExist = await User.findOne({ email });

        if (userExist) {
            console.log('User exists');
            return res.status(400).json({ msg: "User already exists" });
        }

        // Bcrypt password hashing
        const saltRound = 10;
        const hash_pass = await bcrypt.hash(password, saltRound);
        console.log("Password hashed successfully");

        // Creating a user
        const user = await User.create({ email, password: hash_pass, name, prof_pic });
        console.log("User created successfully");
        
        //Token generated for user
        const token = await user.generateToken();
        console.log(token);

        return res.status(201).json({ message: user, token: await user.generateToken(), userId: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { posts, register, upload };
