const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email :{
        type: String,
        require: true
    },
    password :{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: false
    },
    prof_pic:{
        type: String,
        require: false
    }
})

UserSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email: this.email.toString(),
            name: this.name.toString()
            
        },process.env.JWT_TOK)
    } catch (error) {
        console.error(error)
    }
}

const User = new mongoose.model("User",UserSchema );

module.exports = User;