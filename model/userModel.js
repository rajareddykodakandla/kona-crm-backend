const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        maxlength:32,
        trim:true,
        required:true
    },
    lastName:{
        type: String,
        maxlength: 32,
        trim: true,
        required: true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    mobileNo:{
        type:String,
        trim:true,
        required:true
    },
    city:{
        type:String,
        trim:true,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model("user", userSchema)