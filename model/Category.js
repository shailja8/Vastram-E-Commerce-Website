const pool = require('../connection/DbConnection');
module.exports = class Category 
{
    constructor(catName,catImg) 
    {
        this.catName = catName;
        this.catImg = catImg;
    }
    saveCategory() 
    {
        return new Promise((resolve,reject) => {
            pool.getConnection((err, con) => {
              if(!err){  
               let sql = "insert into category(cat_name,cat_img) values(?,?)";
               con.query(sql,[this.catName,this.catImg],(err,result)=>{
                 con.release(); 
                 err ? reject(err) : resolve(result);
               });
              }
              else 
                reject(err);
            });
        });                        
    }

    updateCategory(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
             if(!err){
              let sql="upadate category set cat_name=?, cat_img=? where id=?";
              console.log("inside update");
              con.query(sql,[this.catName,this,catImg,id],(err,result)=>{
               con.release();   
               if(err)
                reject(err);
               else{
                 resolve(result);
               } 
              });
             }
            });
        });
    }
    
}