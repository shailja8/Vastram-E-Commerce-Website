const Wishlist = require('../../model/wishlist');
exports.addToWishlist = (request,response,next)=>{
   let wishlist = new Wishlist();
   wishlist.wish_user_id = request.session.current_user;
   wishlist.wish_p_id = request.params.p_id;

   wishlist.addToWishlist().then(result=>{
     console.log(result); 
     return response.json({
        message: "success"
     });
   }).catch(err=>{
       console.log(err);
       return response.json({
         message: "error"
      });
   });
}

exports.removeFromWishlist = (request,response,next)=>{
    let wishlist = new Wishlist();
   wishlist.wish_user_id = request.session.current_user;
   wishlist.wish_p_id = request.params.p_id;

   wishlist.removeFromWishlist().then(result=>{
     console.log(result); 
     return response.json({
        message: "success"
     });
   }).catch(err=>{
       console.log(err);
       return response.json({
         message: "error"
      });
   });
}