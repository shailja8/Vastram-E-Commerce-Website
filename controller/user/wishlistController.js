const { request, response } = require("express");
const Wishlist= require('../../model/wishlist');

exports.addToWishlist= (request,response,next)=>{
    let wishlist = new Wishlist();
    wishlist.user_id =  request.session.current_user;
    wishlist.p_id = request.params.pid;
    wishlist.addToWishlist()
    .then(result=>{
        console.log(result);
        return response.json({
            message: "success"
        });
    })
    .catch(err=>{
        console.log(err);
        return response.json({
            message: "error"
        });
    });
}
exports.removeToWishlist= (request,response,next)=>{
    let wishlist = new Wishlist();
    wishlist.user_id =  request.session.current_user;
    wishlist.p_id = request.params.pid;
    wishlist.removeToWishlist()
    .then(result=>{
        console.log(result);
        return response.json({
            message: "success"
        });
    })
    .catch(err=>{
        console.log(err);
        return response.json({
            message: "error"
        });
    });
}