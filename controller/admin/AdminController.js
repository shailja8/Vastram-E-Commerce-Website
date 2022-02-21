const { response } = require("express");
const Admin=require("../../model/Admin");

exports.loginpage=(req,res)=>{
    res.render("./admin/adminlogin.ejs");
}

exports.loginpost=(req,res)=>{
    console.log(req.body);
    var admin=new Admin(req.body.email,req.body.password);
    admin.checkLogin()
    .then((result)=>{
        console.log("success");
        res.render("../views/admin/homepage.ejs");
    })
    .catch((err)=>{
        console.log("fail");
        res.send(err);
    });
}
