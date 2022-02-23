const Category = require('../../model/Category');
const path = require('path');

exports.updateCategory=(req,res)=>{
   const file = req.files.catImg;
   const fileName =new Date().getTime()+file.name;

   console.log("inside conroller");
   if(file){
    const filepath = path.join(__dirname,"../../","Public/admin/images",fileName);
    file.mv(filepath,err=>{
     if(!err){
      if(req.body.catName && file)
      {
        let category= new Category(req.body.catName,fileName);
        category.updateCategory(req.body.id)
        .then(result=>{
          res.send("update successfully...");
        })
        .catch();
      }
     }
    });
   }
};

exports.addCategory = (req,res,next)=>{
  console.log("Inside add")
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
              res.send("Category successfully added.")
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