const Admin = require("../../model/Admin");

exports.adminEdit = (req, res) => {
  var admin = new Admin();
  Admin.fetchAllData(req.params.id)
    .then((result) => {
      res.render("./admin/edit-category.ejs", { result });
    })
    .catch((err) => {});
};

exports.adminDelete = (req, res) => {
  Admin.delete(req.params.id)
    .then((result) => {
      res.send("Category deleted successfully");
    })
    .catch();
};

exports.adminViewCategory = (req, res) => {
  var admin = new Admin();
  admin.viewCat()
  .then((result) =>{
      res.render("./admin/view_category.ejs", { result });
    })
    .catch();
};

exports.fetchQuery=(req,res)=>{
 var admin = new Admin();
  admin.fetchQuery()
  .then((result)=>{
    res.render("./admin/view_query.ejs",{result});
  })
  .catch((err)=>{
    console.log(err);
    res.send("Oops! Something went wrong.")
  });
}

exports.loginpage = (req, res) => {
  res.render("./admin/adminlogin.ejs");
};

exports.loginpost = (req, res) => {
  console.log(req.body.email+"in controller email");
  console.log( req.body.password+"in controller password");
  var admin = new Admin(req.body.email, req.body.password);
  
  admin.checkLogin()
    .then((result) => {
      req.session.current_user = req.body.email;
      res.redirect("/admin/homepage");
    })
    .catch((err) => {
      res.redirect("/admin/adminlogin.ejs");
    });
};

exports.admin_homepage = (req, res) => {
  res.render("admin/homepage.ejs", {
    title: "Admin Homepage",
  });
};
