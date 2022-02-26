const pool = require("../connection/DbConnection");
module.exports = class Query{
     Query(username,useremail,userquery){
     this.username = username;
     this.useremail = useremail;
     this.userquery = userquery;
    }
    send(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  var sql = "insert into query(username,useremail,userquery) values(?,?,?)";
                  con.query(sql,[this.username,this.useremail,this.userquery],(err,result)=>{
                      con.release;
                      err ? reject(err) :resolve(result);
                  });
                }else
                reject(err);
            });
        });
    }

}