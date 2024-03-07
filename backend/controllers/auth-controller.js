const User = require('../models/user-model');
const bcrypt = require("bcrypt");

const home = async (req,res) => {
    try {
        res
            .status(200)
            .send("Worked using router");
    } catch (error) {
        console.log(error)
    }
}

const register = async (req,res) => {
    try {
        console.log("Inside register try")
        const {email, password, name ,prof_pic} = req.body;
        console.log("req.body destructered")
        
        const userExist = await User.findOne({email}); // When using findOne always use await
        
        if(userExist)
        {
            console.log('user exists')
            return res.status(400).json({msg:"Exists"});
        }

        const saltRound = 10;
        const hash_pass = await bcrypt.hash(password,saltRound);
        console.log("hash successful")

        const UserCreated = await User.create({email,password:hash_pass,name,prof_pic})
        console.log("User created")

        res.status(201).json({message:UserCreated, token: await UserCreated.generateToken(), userId:UserCreated._id.toString()});
    } catch (error) {
        console.log(error)
    }
}

const login = async (req,res) =>{
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email: email});
        console.log("Entered pass: ",password)
        console.log("DB pass: ",userExist.password)

        if(!userExist)
        {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const user = await bcrypt.compare(password, userExist.password);

        if(user){
            res.status(200).json({
                msg: "Login Successful!",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            })
        }
        else{
            res.status(401).json({message: "Invalid email/pass"});
        }

    } catch (error) {
        res.status(400).json("Internal server error",error)
    }
}



module.exports = {home,register, login};


