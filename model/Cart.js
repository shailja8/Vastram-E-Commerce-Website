const pool = require('../connection/DbConnection');
module.exports = class Cart{
    constructor(p_id,user_id){
        this.p_id = p_id;
        this.user_id = user_id;
    }
  
    addItemInCart(){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
          if(!err){
              let sql = "insert into cart(user_id,p_id) values(?,?)";
              con.query(sql,[this.user_id,this.p_id],(err,result)=>{
                con.release();  
                err ? reject(err) : resolve(result);
              });
          }
          else
          {
            console.log(err);
            reject(err);
          }
        })
      }
    )}

}