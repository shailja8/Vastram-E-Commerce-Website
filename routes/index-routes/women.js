const express = require('express');

const womencontroller = require('../../controller/index/WomenController');

const router = express.Router();

router.get("/women",womencontroller.womenHomePage);

module.exports = router;