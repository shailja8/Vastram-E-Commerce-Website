const main = require('express');
const session=require('express-session');
const app= main();
const path = require('path');

const bodyParser= require('body-parser');

const indexRouter = require('./routes/index-routes/index');
const userRoute = require("./routes/user-routes/user");
const menRouter = require('./routes/index-routes/men');
const womenRouter = require('./routes/index-routes/women');

const adminRoute= require('./routes/admin-routes/admin');
const categoryRouter = require('./routes/admin-routes/category');
const productRouter = require('./routes/admin-routes/product');

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const staticfile= path.join(__dirname,"Public");
app.use(main.static(staticfile));

app.use(session({
   secret: 'fcv123'
}));

app.use("/admin",adminRoute);   
app.use("/category",categoryRouter);
app.use("/product",productRouter);
app.use("/user",userRoute);
// app.use(indexRouter);
// app.use(menRouter);
// app.use(womenRouter);

app.listen(3000,()=>{console.log("--SERVER STARTED--")});
