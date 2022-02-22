const main = require('express');
const app= main();
const path = require('path');

const userRoute = require("./routes/user-routes/user");

const bodyParser= require('body-parser');
const session=require('express-session');
const fileupload = require('express-fileupload');
const adminRoute= require('./routes/admin-routes/admin');
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
app.listen(3000,()=>{console.log("--SERVER STARTED--")});

