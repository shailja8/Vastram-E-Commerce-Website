const express = require('express');
const Cart = require('../../model/Cart');
const cartController = require('../../controller/user/CartController');
const userAuth = require('../../middleware/user.auth');
const request = express.Router();

request.get("/add-to-cart/:p_id",cartController.addToCart);

request.get("/remove-from-cart/:p_id",cartController.removeFromCart);

// request.get("/view-cart",cartController.viewCart);

module.exports = request;