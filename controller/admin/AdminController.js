const Admin = require("../../model/Admin");
const QueryModal = require("../../model/query");

exports.getHomepage = (req, res) => {
  res.render("./admin/homepage.ejs");
};
exports.adminEdit = (req, res) => {
  var admin = new Admin();
  Admin.fetchAllData(req.params.id)
    .then((result) => {
      res.render("./admin/edit-category.ejs", { result });
    })
    .catch((err) => {});
};

exports.adminDelete = (req, res) => {
  Admin.delete(req.params.id).then((result) => {
      //alert("Category deleted successfully.")
      res.send("Category deleted successfully");
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

exports.loginpost = (req, res) => {
  console.log(req.body.email + "in controller email");
  console.log(req.body.password + "in controller password");
  var admin = new Admin(req.body.email, req.body.password);

  admin
    .checkLogin()
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
