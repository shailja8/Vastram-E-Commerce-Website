const express = require('express');

const indexcontroller = require('../../controller/index/IndexController');

const router = express.Router();

router.get("/",indexcontroller.indexPage);

module.exports = router;

const express=require('express');
const request= express.Router();
const indexRouter=require("../../controller/index/IndexController");

request.get("/",indexRouter.indexPage);

request.get("/men",indexRouter.menPage);

request.get("/women",indexRouter.womenPage);

module.exports = request;

