const express = require('express');
const   request = express.Router();
const wishlistRouter = require("../../controller/user/wishlistController");
const auth = require('../../middleware/user.auth');


request.get("/add-to-wishlist/:pid",auth.isAuth,wishlistRouter.addToWishlist);

request.get("/remove-to-wishlist/:pid",auth.isAuth,wishlistRouter.removeToWishlist);

module.exports= request;