// getting remaining seats from trainstable 
const express = require('express')
const  router = express.Router()
const db = require("../config/db")

router.get('/getSeats', function(req, res) {

    const trainName = req.query.trainName
    console.log(trainName);
    const sql = "SELECT * FROM trainstable WHERE train_name =?"
    db.query((sql), [trainName], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            if (results.length <= 0) {
                console.log("No train Found");
                return  res.status(400).json({ status: " No Train Found" });
            }
            else {//results.length > 0
                console.log("Train Found With Success");
                console.log(JSON.stringify(results));
                const result ={
                    remaining_first_class: results[0].remaining_first_class,
                    remaining_second_class: results[0].remaining_second_class,
                }
                res.status(200).json(result);
            }
        }
    });

})

module.exports = router