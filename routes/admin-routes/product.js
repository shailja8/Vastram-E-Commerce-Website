const express=require('express');
const request= express.Router();

const multer = require('multer');
const uploadFiles = multer({dest : 'Public/admin/images'});
const authenticate = require('../../middleware/authenticate-user');
const productController =require('../../controller/admin/ProductController');

request.get("/addproductpage",authenticate.authenticate_user,productController.addProduct);
request.post("/add",authenticate.authenticate_user,uploadFiles.array('productImages'),productController.saveProduct);

request.get("/viewproductpage",authenticate.authenticate_user,productController.viewproductpage);
//request.post("/edit/:id",authenticate.authenticate_user,uploadFiles.array('productImages'),productController.editProduct);
//request.get("/delete/:id",authenticate.authenticate_user,productController.deleteProduct);

module.exports=request;