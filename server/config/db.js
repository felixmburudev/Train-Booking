//db.js
const mysql = require('mysql2')
require("dotenv").config()

const db = mysql.createConnection({
    host: process.DB_HOST,
    user: process.DB_USER,
    password: process.PASSWORD,
    database: process.DB_NAME
})
db.connect((err) => {
    if (err) throw "ERR" + err;
    console.log('Connected to MySQL database');
});

module.exports = db