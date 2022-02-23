const express = require('express');

const mencontroller = require('../../controller/index/MenController');

const router = express.Router();

router.get("/men",mencontroller.menHomePage);

module.exports = router;