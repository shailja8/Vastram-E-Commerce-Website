const Category = require('../../model/Category');
const path = require('path');

exports.addCategory = (req,res,next)=>{
 const file = req.files.catImg;
 const fileName = new Date().getTime()+file.name;
  if(file){
    const filePath  = path.join(__dirname,"../","public/images",fileName);
    file.mv(filePath,err=>{
      if(!err)
      {
        if(req.body.catName && file)
        {
          let category = new Category(req.body.catName,fileName);
          category.saveCategory()
          .then(result=>{
              res.redirect("/admin/homepage");
          })
          .catch(err=>{
              response.send("Error");
          });
        }  
      }
      else
        response.send("----Error----");
    });
  }
};