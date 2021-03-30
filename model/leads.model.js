const mongoose = require('mongoose')

const leadsSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:String,
        trim:true,
        required:true
    },
    technology:{
        type:String,
        trim:true,
        required:true
    },
    source:{
        type:String,
        trim:true,
        required:true
    },
    leadOwner:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("leads", leadsSchema)