const express = require('express')
const  router = express.Router()
const db = require("../config/db")

router.post("/book", (req, res) =>{
    const { passengers } = req.body;
    // const passengerList = [...passengers, ]
    const noOfPassengersAdded = passengers.length;
    console.log("the length is "+noOfPassengersAdded);
    console.log(req.body);

    const query = `INSERT INTO booking (name, email, ticketNo, phoneNo, fromCity, toCity, departureTime, travelClass, id) VALUES ?`;
    const values = passengers.map((passenger) =>[
        passenger.name,
        passenger.email,
        passenger.ticketNo,
        passenger.phoneNumber,
        passenger.fromCity,
        passenger.toCity,
        passenger.departureTime,
        passenger.travelClass,
        passenger.id,


    ]);
    db.query(query, [values], (err, results) => {
        if(err){
            console.error("theheh error insertiong " + err);
            res.status(500).json({ error: "Error Inserting "})
        }
        else{
            console.log("data inserted ");
            UpdateBookedTrains( passengers[0], noOfPassengersAdded);
            res.status(200).json({message: "Data inserted  successfully "});
        }

    });
});
function UpdateBookedTrains( passengers, noOfPassengersAdded ){
    const trainName = `${passengers.departureTime}-${passengers.toCity}-Express`;
    const classColumn = `${passengers.travelClass}Class`;
    const sql = `UPDATE trainstable SET ${classColumn} = ? WHERE name = ? `;
    const values = [noOfPassengersAdded, trainName];
    db.query((sql), values , (errorIn, results)=>{
        if(errorIn){ console.log("ERROR ADDING NO OF PASS "+ errorIn)}
        else{console.log("NO OF PAS ADDED")}
    })
}

module.exports = router

