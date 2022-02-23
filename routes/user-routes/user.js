const { Router } = require("express");
const express = require("express");
const request = express.Router();
const userRouter = require("../../controller/user/UserController");
const auth = require('../../middleware/user.auth');

request.get("/",userRouter.loginPage);

request.post("/login",userRouter.loginPost);

request.get("/dashboard",auth.isAuth,userRouter.dashboardPage);

request.get("/register",userRouter.registerPage);

request.post("/register",userRouter.registerPost);

request.get("/men",userRouter.menPage);

request.get("/women",userRouter.womenPage);

// request.post("/add-to-cart",userRouter.addToCart);


module.exports = request;