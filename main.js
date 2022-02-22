const main = require('express');
const session=require('express-session');
const app= main();
const path = require('path');
const bodyParser= require('body-parser');
const fileupload = require('express-fileupload');

const adminRoute= require('./routes/admin-routes/admin');
const userRoute = require("./routes/user-routes/user");
const categoryRouter = require('./routes/admin-routes/category');

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const staticfile= path.join(__dirname,"Public");
app.use(main.static(staticfile));

app.use(session({
   secret: 'fcv123'
}));
app.use(fileupload());

app.use("/admin",adminRoute);   
app.use("/user",userRoute);
app.use("/category",categoryRouter);
app.listen(3000,()=>{console.log("--SERVER STARTED--")});

