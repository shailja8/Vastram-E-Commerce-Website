// const pool = require("../connection/DbConnection");
// const cart = null;
// module.exports = class Cart{
//     constructor(user_id,p_id){
//         this.user_id = user_id;
//         this.p_id = p_id;
//     }
//     static save(product) {

//         if (cart === null) {
//             cart = { products: [], totalPrice: 0 };
//         }

//         const existingProductIndex = cart.products.findIndex(product => product.id == prodId); // to check product is existing in cart
//         if (existingProductIndex >= 0) { // exist in cart already
//             const exsitingProduct = cart.products[existingProductIndex];
//             exsitingProduct.p_qty += 1;
//         } else { //not exist
//             product.p_qty = 1;
//             cart.products.push(product);
//         }

//         cart.totalPrice += product.p_price;

//     }

// }