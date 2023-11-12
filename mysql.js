import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE polling_system", function (err, result) {
    if (err) throw err;
    console.log("Database created");
    con.end();
  });
});
