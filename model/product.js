const pool = require("../connection/DbConnection");
module.exports = class Product {
  constructor(
    p_name,
    p_price,
    p_qty,
    cat_id,
    //cat_name,
    p_date,
    p_size,
    p_imagefront,
    p_imageback,
    p_imageright,
    p_imageleft,
    description
  ) {
    this.p_name = p_name;
    this.p_price = p_price;
    this.p_qty = p_qty;
    this.cat_id = cat_id;
    this.p_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.p_size = p_size;
    this.p_imagefront = p_imagefront;
    this.p_imageback = p_imageback;
    this.p_imageright = p_imageright;
    this.p_imageleft = p_imageleft;
    this.description = description;
  }

  static deleteProduct(id){
   return new Promise((resolve,reject)=>{
     pool.getConnection((err,con)=>{
       if(!err)
       {
         var sql="delete from product where id=?";
         con.query(sql,[id],(err,result)=>{
          con.release();
          err? reject(err):resolve(result);
         });
       }
       else
       { reject(err); }
     });
   });
  }
  
  saveProduct() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (!err) {
          var sql =
            "insert into product(p_name,p_price,p_qty,cat_id,p_date,p_size,p_imagefront,p_imageback,p_imageright,p_imageleft,description) values(?,?,?,?,?,?,?,?,?,?,?)";
          con.query(
            sql,
            [
              this.p_name,
              this.p_price * 1,
              this.p_qty * 1,
              this.cat_id * 1,
              //this.cat_name,
              this.p_date,
              this.p_size,
              this.p_imagefront,
              this.p_imageback,
              this.p_imageright,
              this.p_imageleft,
              this.description,
            ],
            (err, result) => {
              con.release();    
              err? reject(err):resolve(result);
            }
          );
        } else reject(err);
      });
    });
  }

  
  viewProduct()
    {
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="select * from product";
                    con.query(sql,[],(err,result)=>{
                        con.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }

  static fetchAllMen() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (err) reject(err);
        else {
          let sql = "select * from product where cat_id = 9";
          con.query(sql, (err, result) => {
             con.release();
            if (err) reject(err);
            else resolve(result);
          });
        }
      });
    });
  }

  static fetchAllWomen() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if(err)
         reject(err);
 else {
          let sql = "select * from product where cat_id = 10";
          con.query(sql, (err, result) => {
            con.release();
            if (err) reject(err);
            else resolve(result);
          });
        }
      });
    });
  }

  static fetchAllProduct(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                reject(err);
                else{
                let sql = "select * from product";
                  con.query(sql,(err,result)=>{
                     con.release();
                     if(err)
                      reject(err);
                     else
                      { 
                        console.log("result");
                        resolve(result);
                      }
                  });
                
                }
            });
        });
    }

//  static fetchProductById(id){
//         return new Promise((resolve,reject)=>{
//             pool.getConnection((err,con)=>{
//                 console.log(id);
//                 if(err)
//                   reject(err);
//                 else
//                 {
//                   let sql = "select * from product where id =?";
//                     con.query(sql,[id],(err,result)=>{
//                         con.release();
//                       if(err)
//                         reject(err);
//                       else
//                         resolve(result);
//                     });
//                 }
//             });
//         })
//     }
// sql = "select product.id,product.p_name,product.p_price,product.p_qty,product.description,product.p_imagefront,product.p_imageleft,product.p_imageright,product.p_imageback,cart.p_id from product left outer join cart on product.id=cart.p_id and cart.user_id="+current_user;

static fetchProductById(id,current_user){
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,con)=>{
      if(!err){
        let sql ="";
        console.log("Inside if......below sql : "+current_user+"....id...."+id);
        if(current_user){
         
          // sql = "select product.id,product.p_name,product.p_price,product.p_qty,product.description,product.p_date,product.cat_id,product.p_size,product.p_imagefront,product.p_imageback,product.p_imageright,product.p_imageleft,cart.user_id, cart.p_id from product left outer join cart on product.id=cart.p_id and cart.user_id="+current_user+" where product.id="+id; 
          sql = "select product.id,product.p_name,product.p_price,product.p_qty,product.description,product.p_date,product.cat_id,product.p_size,product.p_imagefront,product.p_imageback,product.p_imageright,product.p_imageleft,cart.user_id, cart.p_id , wishlist.wish_p_id , wishlist.wish_user_id from product left outer join cart on product.id=cart.p_id and cart.user_id="+current_user+" left outer join wishlist on product.id=wishlist.wish_p_id and wishlist.wish_user_id="+current_user+" where product.id="+id; 
       
        }
        else
        sql = "select * from product where id="+id;

        con.query(sql,(err,queryResults)=>{
          con.release();
          console.log("Query Resutl.....................");
          console.log(queryResults);
          err ? reject(err) : resolve(queryResults);
        });
      }
      else
        reject(err);
    })
  });
}




}
