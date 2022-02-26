const pool=require("../connection/DbConnection");

module.exports=class Admin
{
    constructor(email,password)
    {
        this.email=email;
        this.password=password;
    }
    
    viewCat()
    {
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="select * from category";
                    con.query(sql,[],(err,result)=>{
                        con.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }
    
    fetchQuery()
    {
       return new Promise((resolve,reject)=>{
         pool.getConnection((err,con)=>{
          if(!err)
          {
            var sql = "select * from query";
            con.query(sql,[],(err,result)=>{
              con.release();
              err? reject(err) : resolve(result);
            });
          }
         });           
       });
    }

    static fetchAllData(id)
    {
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="select * from category where id=?";
                    con.query(sql,[id],(err,result)=>{
                        con.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }
    
    checkLogin()
    {
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="select * from admin where email=? and password=?";
                    con.query(sql,[this.email,this.password],(err,result)=>{
                        con.release();
                        //console.log(email);
                        //console.log(password);
                        console.log(this.email);
                        console.log(this.password);
                        err ? reject(err):resolve(result);
                    });
                }
            });
        });
    }

    static delete(id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else 
                {
                    var sql="delete from category where id=?";
                    con.query(sql,[id],(err,result)=>{
                        con.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }
}