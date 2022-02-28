const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit:100,
  host:'localhost',
  user: 'root',
  password:'123456789',
  database:'vastram'
}); 

module.exports= pool;