const db = require('./db');
//generating a random ticket number between 111111 and 999999

function generateTicketNumber() {
    let ticketNumber = Math.floor(Math.random() * 900000) + 100000;
    //check if the ticket number exists in bookingtable table
    db.query(`SELECT * FROM bookingtable WHERE ticketNo = '${ticketNumber}'`, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            if (results.length > 0) {
                ticketNumber = generateTicketNumber();
                console.log(ticketNumber)
            }
        }
    });
    return ticketNumber
}

module.exports = generateTicketNumber; 