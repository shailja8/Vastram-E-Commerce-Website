const express = require('express');
const request= express.Router();
const indexRouter=require("../../controller/index/IndexController");

request.get("/",indexRouter.indexPage);

request.get("/men",indexRouter.menPage);

request.get("/women",indexRouter.womenPage);

module.exports = request;

