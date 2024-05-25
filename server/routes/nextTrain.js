const express = require('express')
const  router = express.Router()
const db = require("../config/db")

router.get('/nextTrain',(req, res)=>{
    const sql =`SELECT * FROM trainstable WHERE departureDate = (SELECT MIN(departureDate) FROM trainstable)`; //
    db.query((sql),  (err, results)=>{
        if(err){
            console.log("error executing sql query next train " + err);
        }
        else{
            if(results.length > 0){
                const trains = results;
                trains.forEach(train => {
                  train.departureDate = new Date(train.departureDate).toLocaleDateString();
                });
                res.status(200).json({status: "Success", data: trains});
            }
            else{
                res.status(400).json({ status: "No Train Found" });
            }
        }
    })
})
module.exports = router