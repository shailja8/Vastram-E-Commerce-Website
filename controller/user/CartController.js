const Cart = require('../../model/Cart');
exports.addToCart = (request,response,next)=>{
   let cart = new Cart();
   cart.user_id = request.session.current_user;
   cart.p_id = request.params.p_id;
   cart.addItemInCart().then(result=>{
     console.log(result); 
    response.send("Item added in cart ");
   }).catch(err=>{
       console.log(err);
       response.send("Item not added");
   });
}
exports.removeFromCart = (request,response,next)=>{
   response.send("Hello remove from cart");
}