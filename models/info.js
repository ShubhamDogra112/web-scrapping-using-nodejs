const express = require("express")
        mongoose  = require("mongoose")


const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("AUTHOR",authorSchema)