const Admin=require("../../model/Admin");

exports.loginpage=(req,res)=>{
    res.render("./admin/adminlogin.ejs");
}

exports.loginpost=(req,res)=>
   {
     var admin=new Admin(req.body.email,req.body.password);
     
     admin.checkLogin()
     .then((result)=>{
          console.log("success");
          req.session.current_user = req.body.email; 
          res.redirect("/admin/homepage");
    })
    .catch((err)=>{
        console.log("fail");
        res.send(err);
    });
}

exports.admin_homepage=(req,res)=>{
    res.render("admin/homepage.ejs",{
      title :'Admin Homepage'  
    });
}