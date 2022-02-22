const pool=require("../connection/DbConnection");

module.exports = class User{
    constructor(name,email,mobile,address,gender,password){
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.gender = gender;
        this.password = password;
    }

    save(){
        return new Promise((resolve,reject)=>{
           pool.getConnection((err,con)=>{
               if(!err){
               let sql = "insert into user(name,email,mobile,address,gender,password) values(?,?,?,?,?,?)"; 
               con.query(sql,[this.name,this.email,this.mobile,this.address,this.gender,this.password],
                       (err,result)=>{
                      if(err){
                       reject(err);
                       console.log(err);
                      }
                      else{
                        resolve(result);
                    }
                      con.release();
                   });
                }
                else
                    reject(err);
            });       
        });
   }

    checkUser(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "select * from user where email = ? and password = ?";
                    con.query(sql,[this.email,this.password],(err,result)=>{
                        if(err) reject(err);
                        else{
                            // console.log(result);
                            resolve(result);
                        }
                        con.release();
                    });
                }
                else
                 {
                   console.log(err);
                   reject(err);
                 }
            });
        });
}


}