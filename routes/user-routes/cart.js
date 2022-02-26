const express = require('express');
const Cart = require('../../model/Cart');
const cartController = require('../../controller/user/CartController');
const userAuth = require('../../middleware/user.auth');
const request = express.Router();

request.get("/add-to-cart/:p_id",cartController.addToCart);

request.get("/remove-from-cart",cartController.removeFromCart);


module.exports = request;