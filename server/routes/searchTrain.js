const express = require('express')
const  router = express.Router()
const db = require("../config/db")

router.get("/search", (req, res) =>{
    const fromCity = req.query.from;
    const toCity = req.query.to;
    const departureDate = req.query.date;
    console.log(req.body);
    console.log(fromCity + departureDate)
    const sqlSearch = 'SELECT * FROM trainstable WHERE fromCity = ? AND toCity = ? AND departureDate = ? '
    db.query((sqlSearch), [fromCity, toCity, departureDate] ,(error, results)=>{
        if(error){
            console.log("ERROR ENCOUNTERED WHILE SEARCHING TRAIN " + error)
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });}
        else if(results.length <= 0){
            console.log("No train FOund");
            res.status(400).json({ status: "Train Found" });
        }
        else if(results.length > 0){
            console.log("Train Found With Success");
            console.log(results[0]);
            res.status(200).json({ status: "Train Found" , data: results})
        }
    })
})

module.exports = router
