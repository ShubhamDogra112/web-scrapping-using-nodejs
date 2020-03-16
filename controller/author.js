author = require("../models/info")
const express = require('express')
      app  = express()



module.exports=(req,res,next)=>{

    author.find()
           .then(authors=>{
               res.render("show",{authors:authors})
           })
           .catch(err=>{
               console.log(err)
               console.log("Something went wrong")
           })

}