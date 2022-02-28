const pool = require("../connection/DbConnection");
module.exports = class Query{
    constructor(name,email,query){
     this.name = name;
     this.email = email;
     this.query = query;
    }
    send(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  var sql = "insert into query(name,email,query) values(?,?,?)";
                  con.query(sql,[this.name,this.email,this.query],(err,result)=>{
                      con.release;
                      err ? reject(err) :resolve(result);
                  });
                }else
            //    console.log(Error);
                reject(err);
            });
        });
    }

}