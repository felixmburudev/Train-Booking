const db = require("../config/db");

function trainScheduler(){

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

   for(let i = 0; i <7; i++){
    const date = new Date()
    date.setDate(date.getDate() +i)
    const trainDate = date.toLocaleDateString().split('T')[0]
    trainCity1.train_name = `${trainDate}-${trainCity1.toCity}-Express`;
    trainCity2.train_name = `${trainDate}-${trainCity2.toCity}-Express`;
    trainCity1.departureDate = date
    trainCity2.departureDate = date
    console.log(trainCity1.departureDate);

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
}

module.exports = trainScheduler