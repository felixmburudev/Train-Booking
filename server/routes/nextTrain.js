const express = require('express')
const  router = express.Router()
const db = require("../config/db")

router.get('/nextTrain',(req, res)=>{
    const sql =`SELECT * FROM trainstable WHERE departureDate = (SELECT MIN(departureDate) FROM trainstable)`;
    db.query((sql),  (err, results)=>{
        if(err){
            console.log("error executing sql query next train " + err);
        }
        else{
            // console.log(results);
            res.status(200).json({status: "Success", data: results});
        }
    })
})
module.exports = router