const pool = require('../connection/DbConnection');
module.exports = class Category 
{
    constructor(catName,catImg) 
    {
        this.catName = catName;
        this.catImg = catImg;
    }

    static fetchAllCategory(){
      return new Promise((resolve,reject)=>{
         pool.getConnection((err,con)=>{
           if(!err){
             let sql = "select * from category";
             con.query(sql,(err,results)=>{
                con.release();
                err ? reject(err) : resolve(results);
             });
           }
           else 
             reject(err);
         }); 
      });
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
            pool.getConnection((err,con) => {
             if(!err)
             {
               let sql="update category set cat_name=?, cat_img=? where id=?";
               con.query(sql,[this.catName,this.catImg,id],(err,result)=>{
               console.log("inside update");    
               con.release();   
               if(err)
                reject(err);
               else
               {
                 console.log("inside else");  
                 resolve(result);
               } 
              });
             }
            });
        });
    }
    
}