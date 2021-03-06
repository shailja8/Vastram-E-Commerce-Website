const express=require('express');
const request= express.Router();

const multer = require('multer');
const uploadFiles = multer({dest : 'Public/admin/images'});
const authenticate = require('../../middleware/authenticate-user');
const productController =require('../../controller/admin/ProductController');

request.get("/add-product-page",authenticate.authenticate_user,productController.addProduct);

request.post("/add-product",authenticate.authenticate_user,uploadFiles.array('productImages'),productController.saveProduct);

request.get("/view-product-page",authenticate.authenticate_user,productController.viewproductpage);

request.get("/edit/:id",authenticate.authenticate_user,productController.editProduct);

request.get("/delete/:id",authenticate.authenticate_user,productController.deleteProduct);

request.get("/edit-product-page/:id",authenticate.authenticate_user,productController.editProductPage);

//request.post("/update-product",authenticate.authenticate_user,uploadFiles.array( 'productImages' : {p_imagefront,p_imageback,p_imageright,p_imageleft}),productController.saveProduct);

module.exports=request;