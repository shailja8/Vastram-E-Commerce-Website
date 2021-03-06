// const { response } = require("express");
//const Query = require("mysql/lib/protocol/sequences/Query");
const Product = require("../../model/product.js");
const Query = require("../../model/query"); 
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
        response.render("index/indexMenProductList.ejs",{
            productList : result
        });
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
}
exports.womenPage =(request,response)=>{
    Product.fetchAllWomen().then(result=>{
        response.render("index/indexWomenProductList.ejs",{
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
exports.queryPage =(request,response,next)=>{
    const q = new Query();
    q.name = request.body.name;
    q.email = request.body.email;
    q.query = request.body.query;
    q.send().then((result)=>{
      response.send("Query Sent.");
    //   response.redirect("/index/index.ejs");
    }).catch((err)=>{
        console.log(err);
      response.send("Something went wrong!")
    });
}