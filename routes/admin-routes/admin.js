const express=require('express');
const request= express.Router();
const authenticate = require('../../middleware/authenticate-user');
const adminController=require("../../controller/admin/AdminController");

request.get("/",adminController.loginpage);
 
request.post("/login",adminController.loginpost);

request.get("/homepage",authenticate.authenticate_user,adminController.admin_homepage);

request.get("/viewcategory",authenticate.authenticate_user,adminController.adminViewCategory);

request.get("/delete/:id",authenticate.authenticate_user,adminController.adminDelete);

request.get("/edit/:id",authenticate.authenticate_user,adminController.adminEdit);

request.get("/query",authenticate.authenticate_user,adminController.fetchQuery);

module.exports=request;