const Product = require("../../model/product.js");
exports.indexPage = (request,response)=>{
    Product.fetchAllProduct().then(result=>{
        response.render("index/index.ejs",{
            productList : result
        });
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
}
exports.menPage =(request,response)=>{
    Product.fetchAllMen().then(result=>{
        response.render("user/indexMenProductList.ejs",{
            productList : result
        });
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
}
exports.womenPage =(request,response)=>{
    Product.fetchAllWomen().then(result=>{
        response.render("user/indexWomenProductList.ejs",{
            productList : result
        });
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
}

exports.aboutPage = (request,response)=>{
     response.render("index/about.ejs");
}

exports.displayProductPage = (request,response)=>{
        const id = request.params.id;
        Product.fetchProductById(id).then(result=>{
             console.log(result);
            response.render("index/displayProduct.ejs",{
                product : result
            });
        }).catch(err=>{
            console.log(err);
            response.send("something went wrong");
        });
}
