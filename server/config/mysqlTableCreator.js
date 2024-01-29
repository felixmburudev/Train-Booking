const db = require('../config/db');
function createMysqlTables(){


const createTableQuery = `
    CREATE TABLE IF NOT EXISTS bookingtable (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        passenger_id INT,
        passanger_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        ticketNo VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(15) NOT NULL,
        fromCity VARCHAR(255) NOT NULL,
        toCity VARCHAR(255) NOT NULL,
        departureTime DATETIME NOT NULL,
        travelClass VARCHAR(50) NOT NULL
        );

    CREATE TABLE IF NOT EXISTS trainstable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        train_name VARCHAR(255) NOT NULL,
        fromCity VARCHAR(255) NOT NULL,
        toCity VARCHAR(255) NOT NULL,
        departureDate DATE NOT NULL,
        remaining_first_class INT DEFAULT 5,
        remaining_second_class INT DEFAULT 10,
        train_capacity INT DEFAULT 15,
        remaining_seats INT,
        firstClassTotal INT DEFAULT 5,
        secondClassTotal INT DEFAULT 10
        
        );

    CREATE TRIGGER IF NOT EXISTS calculate_remaining_seats_before_insert BEFORE INSERT  ON trainstable
        FOR EACH ROW
        SET NEW.remaining_seats =  NEW.remaining_first_class + NEW.remaining_second_class;

    CREATE TRIGGER IF NOT EXISTS  calculate_remaining_seats_before_update BEFORE UPDATE ON trainstable
         FOR EACH ROW
        SET NEW.remaining_seats =  NEW.remaining_first_class + NEW.remaining_second_class;


    CREATE TRIGGER IF NOT EXISTS delete_old_trains
        AFTER INSERT ON trainstable
        FOR EACH ROW
        
          DELETE FROM trainstable WHERE departureDate < DATE_SUB(CURDATE(), INTERVAL 7 DAY);
`;

const queries = createTableQuery.split(';').filter(query => query.trim() !== '');

for (const query of queries) {
    db.query(query, (error) => {
        if (error) {
            console.error('Error creating :', error);
        } else {
            console.log('created successfully');
        }
    });
}
}
module.exports = createMysqlTables