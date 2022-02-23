exports.authenticate_user= (req,res,next)=>{
    if(req.session.current_user)
    {
       console.log( req.session.current_user);
       next();
    }
    else{
      res.redirect("/admin/");
      console.log( req.session.current_user);
    }  
}