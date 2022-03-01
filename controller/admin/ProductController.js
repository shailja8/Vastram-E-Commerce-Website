const Category = require("../../model/Category");
const Product = require("../../model/product");
const path = require('path');
const alert= require('alert');

exports.saveProduct = (req, res, next) => {
    let product = new Product();
    product.p_imagefront = "";
    product.p_imageback = "";
    product.p_imageright = "";
    product.p_imageleft = "";
    if (req.files.length > 0) {
        product.p_imagefront = req.files[0].filename;
        if (req.files.length > 1) {
           product.p_imageback = req.files[1].filename;
          if (req.files.length > 2) {
             product.p_imageleft = req.files[2].filename;
             if (req.files.length > 3) {
               product.p_imageright = req.files[3].filename;
            }
        }
        }
    }
    product.cat_id = req.body.cat_id;
    product.p_name = req.body.p_name;
    product.p_qty = req.body.p_qty;
    product.description = req.body.description;
    product.p_price = req.body.p_price;
    product.p_size = req.body.p_size;

    product.saveProduct()
        .then((result) => {
        res.send("Product added succesfully");
        //alert('Data added succesfully');
        // res.redirect("/admin/homepage");
        })
        .catch((err) => {
         console.log(err);
         res.send("Something went wrong!");
        });
};

exports.deleteProduct =(req,res) =>{
  Product.deleteProduct(req.params.id)
  .then((result)=>{
    res.send("Product Deleted Successfully");
  })
  .catch((err)=>{
    console.log(err);
    res.send("Oops! Something went wrong!");
  });
}

exports.editProduct=(req,res,next)=>{
 Product.fetchProductById(req.params.id)
 .then((result)=>{
    res.render("./admin/edit-product.ejs", { result });
 })
 .catch((err)=>{
   res.send("Oops! Something went wrong!");
   console.log(err);
 });
}

exports.updateProduct=(req,res,next)=>{
   var product = new Product();
    product.p_name = req.body.p_name;
    product.p_price = req.body.p_price;
    product.p_qty = req.body.p_qty;
    product.cat_id = req.body.cat_id;
    product.p_size = req.body.p_size;
    product.p_imagefront = "";
    product.p_imageback = "";
    product.p_imageright = "";
    product.p_imageleft = "";
    if (req.files.length > 0) {
        product.p_imagefront = req.files[0].filename;
        if (req.files.length > 1) {
        product.p_imageback = req.files[1].filename;
        if (req.files.length > 2) {
            product.p_imageleft = req.files[2].filename;
            if (req.files.length > 3) {
            product.p_imageright = req.files[3].filename;
            }
        }
        }
    }
    product.saveproduct()
        .then((result) => {
        res.send("Product Updated succesfully");
        // res.redirect("/admin/homepage");
        })
        .catch((err) => {
        console.log(err);
        return res.send("Oops! Something went wrong!");
        });
}

exports.addProduct = (req, res) => {
  Category.fetchAllCategory()
    .then((results) => {
      console.log(results);
      return res.render("admin/add-product.ejs", {
        categories: results,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send("Oops! Somethimg went wrong.");
    });
};

exports.editProductPage=(req,res)=>{
  Promise.all([Category.fetchAllCategory(),Product.fetchProductById(req.params.id)])
  .then((result)=>{
   console.log(result);
   res.render("admin/edit-product.ejs",{categories:result[0], pDetails : result[1]});
  })
  .catch((err) => {
    console.log(err);
    return res.send("Oops! Somethimg went wrong.");
  });

}

exports.viewproductpage = (req,res) => {
  var product = new Product();
  product.viewProduct()
    .then((result) => {
      res.render("admin/view_products.ejs", { result });
    })
    .catch((err) => {
      console.log(err);
      return res.send("Oops! Somethimg went wrong.");
    });
};
