const Product = require("../../model/product.js");
exports.indexPage = (request,response)=>{
    response.render("/user/dashboard.ejs");
}
exports.menPage =(request,response)=>{
    Product.fetchAllMen().then(result=>{
        console.log(result);
        response.send("hello boys");
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
}
exports.womenPage =(request,response)=>{
    Product.fetchAllWomen().then(result=>{
        console.log(result);
        response.send("hello girls");
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
}
