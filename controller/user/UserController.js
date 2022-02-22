const User = require("../../model/user.js");
const Product = require("../../model/product.js");
// const Product = require("../../model/admin/admin");
exports.loginPage=(request,response)=>{
   response.render("./user/userlogin.ejs");
}
exports.loginPost = (request,response)=>{
    let user = new User();
    user.email = request.body.email;
    user.password = request.body.password;
    user.checkUser().then(result=>{
        if(result.length>0){
            request.session.current_user = user.email; 
          response.redirect("/user/dashboard");   
        }
        else
        { console.log(result);
         response.send(result+"\n Please Enter Email and Password");
        }
    }).catch(err=>{
         console.log(err);
         response.send("Something went wrong");
    });
}

exports.dashboardPage = (request,response)=>{
        response.render("user/dashboard.ejs");
}

exports.registerPage = (request,response)=>{
       response.render("user/register.ejs");
}

exports.registerPost = (request,response)=>{
    let user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.mobile = request.body.mobile;
    user.address = request.body.address;
    user.gender = request.body.gender;
    user.password = request.body.password;
    user.save().then(result=>{
        response.render("user/userlogin.ejs");
    }).catch(err=>{
        console.log(err);
        response.send("Registration Failed");
    });
}
exports.menPage =(request,response)=>{
    Product.fetchAllMen().then(result=>{
        console.log(result);
        response.render("user/menProductList.ejs",{
            productList : result
        });
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
}
exports.womenPage =(request,response)=>{
    Product.fetchAllWomen().then(result=>{
        console.log(result);
        response.send("hello user girls");
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
}
