const mysql = require('mysql2')
require("dotenv").config()

const database = mysql.createConnection({
    host: process.DB_HOST,
    user: process.DB_USER,
    password: process.DB_PASSWORD,
    database: process.DB_NAME
})
db.connect((err) => {
    if (err) throw "ERR" + err;
    console.log('Connected to MySQL database');
});


const createTableQuery = `

    CREATE TABLE IF NOT EXISTS bookingtable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        ticketNo VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(15) NOT NULL,
        fromCity VARCHAR(255) NOT NULL,
        toCity VARCHAR(255) NOT NULL,
        departureTime DATETIME NOT NULL,
        travelClass VARCHAR(50) NOT NULL,
        passenger_id INT
    );

    CREATE TABLE IF NOT EXISTS trainstable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        fromCity VARCHAR(255) NOT NULL,
        toCity VARCHAR(255) NOT NULL,
        departureDate DATE NOT NULL
    );
`;

const queries = createTableQuery.split(';').filter(query => query.trim() !== '');

for (const query of queries) {
    db.query(query, (error) => {
        if (error) {
            console.error('Error creating tables:', error);
        } else {
            console.log('Tables created successfully');
        }
    });
}
module.exports = db