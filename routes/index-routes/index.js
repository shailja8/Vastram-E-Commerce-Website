const express = require('express');
const indexRouter=require("../../controller/index/IndexController");
const request= express.Router();

request.get("/",indexRouter.indexPage);

request.get("/men",indexRouter.menPage);

request.get("/women",indexRouter.womenPage);

request.get("/about-us",indexRouter.aboutPage);

request.get("/displayProduct/:id",indexRouter.displayProductPage);
module.exports = request;

