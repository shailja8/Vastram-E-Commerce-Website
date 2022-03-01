const Cart = require('../../model/Cart');
exports.addToCart = (request,response,next)=>{
   let cart = new Cart();
   cart.user_id = request.session.current_user;
   cart.p_id = request.params.p_id;

   cart.addItemInCart().then(result=>{
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

exports.removeFromCart = (request,response,next)=>{
   let cart = new Cart();
   cart.user_id = request.session.current_user;
   cart.p_id = request.params.p_id;

   cart.removeItemFromCart().then(result=>{
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

//  exports.viewCart = (request,response,next)=>{
//   response.render("user/cart.ejs"); 
// }
}