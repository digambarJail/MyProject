// const User = require('../models/user-model');
// const bcrypt = require("bcrypt");
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// dotenv.config({
//     path: './env'
// });

// // Connect to MongoDB Atlas using Mongoose
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log("Connected to MongoDB Atlas");
// })
// .catch((error) => {
//     console.error("Error connecting to MongoDB Atlas:", error);
//     process.exit(1);
// });

// const posts = async (req, res) => {
//     try {
//         const users = await User.find();
//         console.log(users);
//         return res.json(users); // Send the data as response
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };


// const register = async (req,res) => {
//     try {
//         console.log("Inside register try")
//         const {email, password, name ,prof_pic} = req.body;
//         console.log("req.body destructered")
        
//         const userExist = await User.findOne({email}); // When using findOne always use await
        
//         if(userExist)
//         {
//             console.log('user exists')
//             return res.status(400).json({msg:"Exists"});
//         }

//         const saltRound = 10;
//         const hash_pass = await bcrypt.hash(password,saltRound);
//         console.log("hash successful")

//         const UserCreated = await User.create({email,password:hash_pass,name,prof_pic})
//         console.log("User created")

//         const token = await UserCreated.generateToken();
//         console.log(token)

//         return res.status(201).json({message:UserCreated, token: await UserCreated.generateToken(), userId:UserCreated._id.toString()});
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = {posts,register};


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

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/') // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Use the original file name as the stored file name
    }
});
const upload = multer({ storage: storage });

const posts = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
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
        console.log("req.body destructured");

        const userExist = await User.findOne({ email }); // When using findOne always use await

        if (userExist) {
            console.log('User exists');
            return res.status(400).json({ msg: "User already exists" });
        }

        const saltRound = 10;
        const hash_pass = await bcrypt.hash(password, saltRound);
        console.log("Password hashed successfully");

        const user = await User.create({ email, password: hash_pass, name, prof_pic });
        console.log("User created successfully");

        const token = await user.generateToken();
        console.log(token);

        return res.status(201).json({ message: user, token: await user.generateToken(), userId: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { posts, register };
