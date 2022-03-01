const Admin = require("../../model/Admin");
const QueryModal = require("../../model/query");
const alert = require('alert');
const popup = require('node-popup');

exports.getHomepage = (req, res) => {
  res.render("./admin/homepage.ejs");
};

exports.adminEditCategory = (req, res) => {
  var admin = new Admin();
  Admin.fetchAllData(req.params.id)
    .then((result) => {
      res.render("./admin/edit-category.ejs", { result });
    })
    .catch((err) => {
      console.log(err)
    });
};

exports.adminDelete = (req, res) => {
  Admin.delete(req.params.id).then((result) => {
    //alert("deleted");
     res.send("Deleted Successfully");
    })
    .catch();
};

exports.adminViewCategory = (req, res) => {
  var admin = new Admin();
  admin
    .viewCat().then((result) => {
      res.render("./admin/view_category.ejs", { result });
    })
    .catch();
};

exports.fetchQuery = (req, res) => {
  var admin = new Admin();
  admin
    .fetchQuery().then((result) => {
      res.render("./admin/view_query.ejs", { result });
    })
    .catch((err) => {
      console.log(err);
      res.send("Oops! Something went wrong.");
    });
};

exports.sendResponsePage = (req, res) => {
  res.render("./admin/QueryResponsePage.ejs", { email: req.params.email });
};

exports.sendResponse = (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.message);
  var query = new QueryModal(req.body.message);
  var mail = req.body.email;
  console.log("new " + mail);
  console.log("new " + req.body.message);
  query.sendMail(mail)
    .then((result) => {
      res.send("Response sent successfully.");
    })
    .catch((err) => {
      res.send("Failed");
    });
};

exports.loginpage = (req, res) => {
  res.render("./admin/adminlogin.ejs");
};

exports.logOut =(req,res)=>{
    req.session.destroy();
    res.redirect("/admin/");  
};

exports.loginpost = (req, res) => {
  var admin = new Admin(req.body.email, req.body.password);
  admin
    .checkLogin()
    .then((result) => {
      if(result.length>0)
      {
        console.log(result);
        req.session.current_user = result[0].id; 
        res.redirect("/admin/homepage");   
      }
      else
      { 
        console.log(result);
        res.send(result+"Please Enter Correct Email and Password");
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/");
    });
};

exports.admin_homepage = (req, res) => {
  res.render("admin/homepage.ejs", {
  });
};
