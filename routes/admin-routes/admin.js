const express=require('express');
const request= express.Router();
const adminController=require("../../controller/admin/AdminController")

request.get("/",adminController.loginpage);
 

request.post("/login",adminController.loginpost);

request.get("/admin/search",(req,res)=>{
  res.render("search-anime");
});

request.get("/admin/login",(req,res)=>{
  res.render("login");
});

request.get("/admin/register",(req,res)=>
{
  res.render("register.ejs");  
});

/*
request.post("/admin/register",(req,res)=>{
  db.getConnection((err,con)=>{
   if(!err)
   {
      let sql="insert into user(username,password,email) values(?,?,?)" ;
      con.query(sql,[req.body.username,req.body.password,req.body.email],(err,result)=>{
       err? res.send("<h1>Something Went Wrong..</h1>"):res.send("Registration Successful");
       con.release();
      });
   }
   else
    res.send("<h1>Something went wrong..</h1>");
  });
});
*/

module.exports=request;