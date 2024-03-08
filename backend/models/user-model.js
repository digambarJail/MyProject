const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    prof_pic: {
        data: Buffer,
        contentType: String,
    }
});

UserSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email.toString(),
            name: this.name.toString()
        }, process.env.JWT_TOK);
    } catch (error) {
        console.error(error);
    }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;