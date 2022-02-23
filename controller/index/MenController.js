const { response } = require("express");

exports.menHomePage=(req,res)=>{
    res.render("index/men.ejs");
}