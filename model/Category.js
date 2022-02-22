const pool = require('../connection/DbConnection');
module.exports = class Category 
{
    constructor(catName,catimg) 
    {
        this.catName = catName;
        this.catImg = catImg;
    }
    saveCategory() 
    {
        return new Promise((resolve,reject) => {
            pool.getConnection((err, con) => {
              if(!err){  
               let sql = "insert into category(cat_name,cat_img) values(?,?)";
               con.query(sql,[this.catName,this.catImg],(err,result)=>{
                 con.release(); 
                 err ? reject(err) : resolve(result);
               });
              }
              else 
                reject(err);
            });
        });
    }
    // delete(id) {
    //     return new Promise((resolve, reject) => {
    //         pool.getConnection((err, con) => {

    //         });
    //     });
    // }
    // update() {
    //     return new Promise((resolve, reject) => {
    //         pool.getConnection((err, con) => {

    //         });
    //     });
    // }
    // categoryById(id) {
    //     return new Promise((resolve, reject) => {
    //         pool.getConnection((err, con) => {

    //         });
    //     });
    // }
    // categoryList() {
    //     return new Promise((resolve, reject) => {
    //         pool.getConnection((err, con) => {

    //         });
    //     });
    // }
}