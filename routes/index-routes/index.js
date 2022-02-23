const express = require('express');


const indexRouter=require("../../controller/index/IndexController");

const request= express.Router();

request.get("/",indexRouter.indexPage);

request.get("/men",indexRouter.menPage);

request.get("/women",indexRouter.womenPage);

module.exports = request;

