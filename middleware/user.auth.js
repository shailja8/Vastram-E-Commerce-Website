exports.isAuth = (request,response,next)=>{
    if(request.session.current_user)
      next();
    else
     response.redirect("/user/");  
}