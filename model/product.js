const pool = require("../connection/DbConnection");
module.exports = class Product {
  constructor(
    p_name,
    p_price,
    p_qty,
    cat_id,
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
          let sql = "select * from product where cat_id = 1";
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
          let sql = "select * from product where cat_id = 2";
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
                      resolve(result);
                  });
                
                }
            });
        })
    }

 fetchProductById(id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                console.log(id);
                if(err)
                reject(err);
                else{
                let sql = "select * from product where id =?";
                  con.query(sql,[parseInt(id)],(err,result)=>{
                      con.release();
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

