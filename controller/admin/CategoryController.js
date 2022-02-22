const Category = require('../../model/Category');
const path = require('path');

exports.addCategory = (req,res,next)=>{
 const file = req.files.catImg;
 const fileName = new Date().getTime()+file.name;
 console.log(req.files.catImg);
 console.log(fileName);
  if(file){
    const filePath  = path.join(__dirname,"../../","Public/admin/images",fileName);
    file.mv(filePath,err=>{
      if(!err)
      {
        if(req.body.catName && file)
        {
          let category = new Category(req.body.catName,fileName);
          category.saveCategory()
          .then(result=>{
              console.log("inside returned promise");
              res.redirect("/admin/homepage");
          })
          .catch(err=>{
              res.send(err);
          });
        }  
      }
      else
        res.send(err);
    });
  }
};