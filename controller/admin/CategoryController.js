const Category = require("../../model/Category");
const path = require("path");

exports.updateCategory = (req, res) => {
  let category = new Category();
  category.catName = req.body.catName;
  category.catImg = req.file.filename;
  category.updateCategory(req.body.id)
    .then((result) => {
     
      res.redirect("/admin/homepage");
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.addCategory = (req, res, next) => {
  let category = new Category();
  category.catName = req.body.catName;
  category.catImg = req.file.filename;
  category.saveCategory()
    .then((result) => {
      // res.send("Category successfully added.");
      res.redirect("/admin/homepage");
    })
    .catch((err) => {
      res.send(err);
    });
};

// exports.addCategory = (req,res,next)=>{
//   console.log("Inside add")
//  const file = req.files.catImg;
//  const fileName = new Date().getTime()+file.name;
//  console.log(req.files.catImg);
//  console.log(fileName);
//   if(file){
//     const filePath  = path.join(__dirname,"../../","Public/admin/images",fileName);
//     file.mv(filePath,err=>{
//       if(!err)
//       {
//         if(req.body.catName && file)
//         {
//           let category = new Category(req.body.catName,fileName);
//           category.saveCategory()
//           .then(result=>{
//               res.send("Category successfully added.")
//               res.redirect("/admin/homepage");
//           })
//           .catch(err=>{
//               res.send(err);
//           });
//         }
//       }
//       else
//         res.send(err);
//     });
//   }
// };
