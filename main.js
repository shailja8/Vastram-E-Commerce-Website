const main = require('express');
const path = require('path');

const indexRouter = require('./routes/index-routes/index');
const menRouter = require('./routes/index-routes/men');

const womenRouter = require('./routes/index-routes/women');

const adminRoute= require('./routes/admin-routes/admin');
const bodyParser= require('body-parser');

const app= main();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:false}));

const staticfile= path.join(__dirname,"public");
app.use(main.static(staticfile));

app.use("/admin",adminRoute);

app.use(menRouter);

app.use(womenRouter);

app.use(indexRouter);

app.listen(3000,()=>{console.log("--SERVER STARTED--")});