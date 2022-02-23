const express = require('express');
const CategoryController = require('../../controller/admin/CategoryController');
const authenticate = require('../../middleware/authenticate-user');
const request = express.Router();

request.post("/add",authenticate.authenticate_user,CategoryController.addCategory);

module.exports = request;