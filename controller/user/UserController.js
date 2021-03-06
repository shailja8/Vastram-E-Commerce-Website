const User = require("../../model/user.js");
const Product = require("../../model/product.js");
const { request, response } = require("express");
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
            console.log(result);
            request.session.current_user = result[0].id; 
          response.redirect("/user/dashboard");   
        }
        else
        { console.log(result);
         response.send(result+"Please Enter Email and Password");
        }
    }).catch(err=>{
         console.log(err);
         response.send("Something went wrong");
    });
}

exports.dashboardPage = (request,response)=>{
    Product.fetchAllProduct().then(result=>{
        response.render("user/dashboard.ejs",{
            productList : result
        });
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
       
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

exports.signoutPage = (request,response)=>{
    request.session.destroy();
    response.redirect("/");   
}

exports.menPage =(request,response)=>{
    Product.fetchAllMen().then(result=>{
        console.log(result);

        response.render("user/menProductList1.ejs",{

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
        response.render("user/womenProductList1.ejs",{
            productList : result
        });
    }).catch(err=>{
        console.log(err);
        response.send("Something went wrong!!");
    });
}

exports.displayProductPage = (request,response)=>{
    const id = request.params.id;
    console.log("id................................"+id);
    console.log("current_user_id---------------------"+request.session.current_user);
    Product.fetchProductById(id,request.session.current_user).then(result=>{
         console.log("Result................................."+result);
         console.log(result);
         console.log(request.session.current_user);
        response.render("user/displayProduct.ejs",{
            product : result,
            isLoggedIn: request.session.current_user
        
        });
    }).catch(err=>{
        console.log(err);
        response.send("something went wrong");
    });
}

exports.aboutPage =(request,response)=>{
    response.render("user/about.ejs");

}
exports.contactPage =(request,response)=>{
    response.render("user/contact.ejs");
}



