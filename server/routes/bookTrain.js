const express = require('express')
const  router = express.Router()
const db = require("../config/db")
const emailServices =require("../controller/email") 
const generateTicketNumber = require('../config/ticketGenerator')
router.post("/book", (req, res) =>{
    const { passengers } = req.body;
    const travelDate = new Date(passengers[0].departureTime);    const currentDate = new Date();
console.log(currentDate + "  => " +travelDate)
    // check if the booking is open
    if (travelDate <= currentDate) {       
        console.log("Travel date has passed.");    
         return res.status(400).json({ error: "Booking is Closed." });

    } else {
        console.log("Travel date is in the future.")
    }
    const noOfPassengersAdded = passengers.length;
    // console.log(JSON.stringify(passengers))
    const query = `INSERT INTO bookingtable (passenger_id ,passenger_name, email, ticketNo, phoneNumber, fromCity, toCity, travelDate, travelClass) VALUES ?`;
    const values = passengers.map((passenger) =>[
        passenger.passenger_id,
        passenger.name,
        passenger.email,
        generateTicketNumber(),
        passenger.phoneNumber,
        passenger.fromCity,
        passenger.toCity,
        new Date(passenger.departureTime).toISOString().split("T")[0],
        passenger.travelClass,


    ]);
    db.query(query, [values], (err, results) => {
        if(err){
            console.error("the error inserting " + err);
           res.status(400).json({ error: "Error occured while booking " + err})
        }
        else{
            console.log("a seat Booked");
            UpdateBookedTrainSeats( passengers[0], noOfPassengersAdded);
            emailServices(passengers)
            res.status(200).json({message: "BOOKING WAS SUCCESSIFULLY "});
        }

    });
});
function UpdateBookedTrainSeats( passengers, noOfPassengersAdded ){
    const trainName = `${passengers.departureTime}-${passengers.toCity}-Express`;
    const classColumn = `remaining_${passengers.travelClass}_class`;
    // console.log(classColumn +trainName + " " + JSON.stringify(passengers))
    const sql = `UPDATE trainstable SET ${classColumn} = ${classColumn} - ? WHERE train_name = ? `;
    const values = [noOfPassengersAdded, trainName];
    db.query((sql), values , (errorIn, results)=>{
        if(errorIn){ console.log("ERROR ADDING SEATS  "+ errorIn)}
        else{console.log(`SEATS ${noOfPassengersAdded}  BOOKED ${results.affectedRows}`)}
    })
}

module.exports = router

