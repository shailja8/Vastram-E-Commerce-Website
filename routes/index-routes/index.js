
const express = require('express');

const indexcontroller = require('../../controller/index/IndexController');

const router = express.Router();

router.get("/",indexcontroller.indexPage);

module.exports = router;