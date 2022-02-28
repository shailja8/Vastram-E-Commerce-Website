const express = require('express');
const   request = express.Router();
const wishlistRouter = require("../../controller/user/wishlistController");
const auth = require('../../middleware/user.auth');


request.get("/add-to-wishlist/:p_id",auth.isAuth,wishlistRouter.addToWishlist);

request.get("/remove-from-wishlist/:p_id",auth.isAuth,wishlistRouter.removeFromWishlist);

module.exports= request;