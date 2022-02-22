const { response } = require("express");

exports.indexPage=(req,res)=>{
    res.render("index/index.ejs");
}