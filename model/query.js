const pool = require("../connection/DbConnection");
const nodemailer = require("nodemailer");
module.exports = class SendRes
{
     constructor(message,name,email)
     {
        this.message = message;
        this.name = name;
        this.email = email;
        console.log("query "+ message);
     }

module.exports = class Query{
    constructor(name,email,query){
     this.name = name;
     this.email = email;
     this.query = query;
    }

    send(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err)
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

   sendMail(mail)
   {
        console.log("mail "+mail);
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure:false,
                    requireTLS: true,
                    auth: 
                        {
                            user: "vastram823@gmail.com",
                            pass: "fcv@1234"
                        }
                  });
                
                var message = 
                  {
                    from: "vastram823@gmail.com",
                    to: mail,
                    subject: "In response to your query.",
                    text: this.message
                  }
                
                  transporter.sendMail(message,(err,info) =>{
                    if (err) {
                      console.log(err)
                    } else {
                      console.log(info);
                      resolve(info);
                    }
                });
            }
            else
            reject(err);
          });
        });
    }
}
