const pool = require('../connection/DbConnection');
const { use } = require('../routes/index-routes');
module.exports = class Wishlist{
    constructor(wish_user_id,wish_p_id){
        this.wish_user_id = wish_user_id;
        this.wish_p_id = wish_p_id;
    }
    addToWishlist(){
        return new Promise((resolve,reject)=>{
           pool.getConnection((err,con)=>{
                if(!err){
                    let sql ="insert into wishlist(wish_user_id,wish_p_id) values(?,?)";
                    con.query(sql,[this.wish_user_id,this.wish_p_id],(err,results)=>{
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
    removeFromWishlist(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                 if(!err){
                     let sql ="delete from wishlist where wish_user_id=? and wish_p_id=?";
                     con.query(sql,[this.wish_user_id,this.wish_p_id],(err,results)=>{
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