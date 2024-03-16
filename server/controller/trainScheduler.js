const db = require("../config/db");

async function trainScheduler(){

    const trainCity1 = {
        train_name: '',
        departureDate: "",
        fromCity: "Nairobi",
        toCity: "Mombasa",
    };

    const trainCity2 = {
        train_name: '',
        departureDate: "",
        fromCity: "Mombasa",
        toCity: "Nairobi",
    };

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const trainDate = date.toLocaleDateString().split('T')[0];
        const trainName1 = `${trainDate}-${trainCity1.toCity}-Express`;
        const trainName2 = `${trainDate}-${trainCity2.toCity}-Express`;
    
        const sqlCheck = `SELECT COUNT(*) AS count FROM trainstable WHERE train_name IN (?, ?)`;
        const valuesCheck = [trainName1, trainName2];
    
        db.query(sqlCheck, valuesCheck, (errorCheck, checkResults) => {
            if (errorCheck) {
                console.log("Error checking for existing trains: " + errorCheck);
                return;
            }
    
            const count = checkResults[0].count;
            if (count === 0) {
                // If no records found, insert the new records
                const sqlInsert = `INSERT INTO trainstable (train_name, fromCity, toCity, departureDate) VALUES ?`;
                const valuesInsert = [
                    [trainName1, trainCity1.fromCity, trainCity1.toCity, date],
                    [trainName2, trainCity2.fromCity, trainCity2.toCity, date]
                ];
    
                db.query(sqlInsert, [valuesInsert], (errorInsert) => {
                    if (errorInsert) {
                        console.log("Error inserting trains: " + errorInsert)
                    } else {
                        console.log("Trains inserted successfully");
                    }
                });
            } else {
                console.log("Records with the same train names already exist. Skipp=ing insertion.");
            }
        });
    }
    
    
}

module.exports = trainScheduler