const main = require('express');
const path = require('path');
const session = require('express-session');
const adminRoute= require('./routes/admin-routes/admin');
const userRoute = require("./routes/user-routes/user");
const bodyParser= require('body-parser');

const app= main();
app.set("view engine","ejs");

app.use(session({
    secret: 'abcdsfghy'
}));

app.use(bodyParser.urlencoded({extended:false}));

const staticfile= path.join(__dirname,"public");
app.use(main.static(staticfile));

app.use("/admin",adminRoute);   
app.use("/user",userRoute);
app.listen(3000,()=>{console.log("--SERVER STARTED--")});
