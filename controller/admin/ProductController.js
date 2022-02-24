const Category = require('../../model/Category');
const Product = require('../../model/product');
const path = require("path");

exports.saveProduct  = (req,res,next)=>{
    let product = new Product();
    product.p_imagefront = "";
    product.p_imageback = "";
    product.p_imageright = "";
    product.p_imageleft = "";
    if(req.files.length>0)
        {
        product.p_imagefront = req.files[0].filename;
        if(req.files.length>1)
            {
                product.p_imageback = req.files[1].filename;
                if(req.files.length>2)
                {
                    product.p_imageleft = req.files[2].filename;
                    if(req.files.length>3)
                    {
                        product.p_imageright = req.files[3].filename;
                    }
                }
            }
        }
    product.cat_id  = req.body.cat_id;
    product.p_name = req.body.p_name;
    product.p_qty = req.body.p_qty;
    product.description = req.body.description;
    product.p_price = req.body.p_price;
    product.p_size = req.body.p_size;
    
    product.saveProduct()
    .then(result=>{
        res.send("Data added succesfully");
        return res.redirect("/admin/homepage");
    })
    .catch(err=>{
        console.log(err);
        return res.send("Something went wrong!");
    });
}

exports.addProduct = (req, res, next) => {
    Category.fetchAllCategory()
        .then(results => {
            console.log(results);
            return res.render("admin/product.ejs",{
                title: "Add Product",
                categories: results
            });

        })
        .catch(err => {
            console.log(err);
            return res.send("Oops! Somethimg went wrong.");
        });
};

exports.viewproductpage = (req, res) => {
    var product = new Product();
    product.viewProduct()
      .then((result) => {
        res.render("admin/view_products.ejs",{ result });
      })
      .catch(err => {
        console.log(err);
        return res.send("Oops! Somethimg went wrong.");
    });
  };