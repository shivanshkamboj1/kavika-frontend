const mongoose = require('mongoose')
const Photoschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        required:true
    },
    image:{
        type:[String],
        default: [], 
    },
    video:{
        type:[String],
        default: [], 
    },
    packages: { type: [String], default: [] }
},{timestamps:true})

module.exports = mongoose.model("Content",Photoschema)