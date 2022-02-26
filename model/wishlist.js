const pool = require('../connection/DbConnection');
const { use } = require('../routes/index-routes');
module.exports = class Wishlist{
    constructor(user_id,p_id){
        this.user_id = user_id;
        this.p_id = p_id;
    }
    addToWishlist(){
        return new Promise((resolve,reject)=>{
           pool.getConnection((err,con)=>{
                if(!err){
                    let sql ="insert into wishlist(user_id,p_id) values(?,?)";
                    con.query(sql,[this.user_id,this.p_id],(err,results)=>{
                       if(err)
                          reject(err);
                        else
                          resolve(results);  
                    });
                }
                else 
                  reject (err);
           });
        });
    }
    removeToWishlist(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                 if(!err){
                     let sql ="delete from wishlist where user_id=? and p_id=?";
                     con.query(sql,[this.user_id,this.p_id],(err,results)=>{
                        if(err)
                           reject(err);
                         else
                           resolve(results);  
                     });
                 }
                 else 
                   reject (err);
            });
         });
    }
}