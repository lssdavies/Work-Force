const mysql = require("mysql2");
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password1234",
    database: "work_force",
  },
  console.log("Connected to the Work Force database.")
);

module.exports = db;
