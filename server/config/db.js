//db.js
const mysql = require('mysql2')
require("dotenv").config()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'felo',
    password: '1234',
    database:'trainbooking'
})
db.connect((err) => {
    if (err) throw "ERR" + err;
    console.log('Connected to MySQL database');
});

module.exports = db