const pool=require("../connection/DbConnection");
module.exports = class Product{
        constructor(p_name,p_price,p_qty,cat_id,p_date,p_size,p_image){
            this.p_name=p_name;
            this.p_price=p_price;
            this.p_qty=p_qty;
            this.cat_id=cat_id;
            this.p_date=p_date;
            this.p_size=p_size;
            this.p_image=p_image;
        }
fetchAllMen(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(err)
            reject(err);
            else{
            let sql = "select * from product where cat_id = 1";
              con.query(sql,(err,result)=>{
                 if(err)
                  reject(err);
                 else
                  resolve(result);
              });
            
            }
        });
    })
}

fetchAllWomen(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(err)
            reject(err);
            else{
            let sql = "select * from product where cat_id = 2";
              con.query(sql,(err,result)=>{
                 if(err)
                  reject(err);
                 else
                  resolve(result);
              });
            
            }
        });
    })
}
}