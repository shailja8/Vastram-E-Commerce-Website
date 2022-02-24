const express = require('express');
const CategoryController = require('../../controller/admin/CategoryController');
const authenticate = require('../../middleware/authenticate-user');
const request = express.Router();
const multer = require('multer');
const uploadfiles = multer({ dest:"Public/admin/images"});

request.post("/update",authenticate.authenticate_user,uploadfiles.single('catImg'),CategoryController.updateCategory);
request.post("/add",authenticate.authenticate_user,uploadfiles.single('catImg'),CategoryController.addCategory);
module.exports = request;