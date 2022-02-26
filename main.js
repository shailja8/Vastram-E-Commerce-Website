const main = require('express');
const session=require('express-session');
const app= main();
const path = require('path');

const bodyParser= require('body-parser');
const indexRoute = require('./routes/index-routes/index');
const userRoute = require("./routes/user-routes/user");
const adminRoute= require('./routes/admin-routes/admin');
const categoryRouter = require('./routes/admin-routes/category');
const productRouter = require('./routes/admin-routes/product');
const wishlistRoute = require('./routes/user-routes/wishlist');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const staticfile= path.join(__dirname,"Public");
app.use(main.static(staticfile));
app.use(session({
   secret: 'fcv123'
}));
  
app.use("/product",productRouter);
app.use("/",indexRoute);
app.use("/admin",adminRoute);   
app.use("/user",userRoute);
app.use("/category",categoryRouter);
app.use("/wishlist",wishlistRoute);


app.listen(3000,()=>{console.log("--SERVER STARTED--")});
