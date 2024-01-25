const db = require("../config/db");

function trainScheduler(){

 // Run every minute
    const trainCity1 = {
        train_name: '',
        departureDate: "",
        fromCity: "city1",
        toCity: "city2",
    };

    const trainCity2 = {
        train_name: '',
        departureDate: "",
        fromCity: "city2",
        toCity: "city1",
    };

    const date = new Date();
    date.setDate(date.getDate() + 7);
    const trainDate = date.toISOString().split('T')[0];
    trainCity1.train_name = `${trainDate}-${trainCity1.toCity}-Express`;
    trainCity2.train_name = `${trainDate}-${trainCity2.toCity}-Express`;
    trainCity1.departureDate = trainDate;
    trainCity2.departureDate = trainDate;

    const sqlInsert = `INSERT INTO trainstable (train_name, fromCity, toCity, departureDate) VALUES ?`;

    const values = [
        [trainCity1.train_name, trainCity1.fromCity, trainCity1.toCity, trainCity1.departureDate],
        [trainCity2.train_name, trainCity2.fromCity, trainCity2.toCity, trainCity2.departureDate]
    ];

    db.query(sqlInsert, [values], (errorInsert, results) => {
        if (errorInsert) {
            console.log("Error inserting trains: " + errorInsert);
        } else {
            console.log("Trains inserted successfully");
        }
    });
}

module.exports = trainScheduler