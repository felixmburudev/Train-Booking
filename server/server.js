const express = require('express');
const mysql = require('mysql2');
const cron = require('node-cron');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'database'
});


db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});
app.get("/search", (req, res) =>{
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



app.get('/nextTrain',(req, res)=>{  
  const sql =`SELECT * FROM trainstable WHERE departureDate = (SELECT MIN(departureDate) FROM trainstable)`;
  db.query((sql),  (err, results)=>{
    if(err){
      console.log("error executing sql query next train " + err);
    }
    else{
      // console.log(results);
      res.status(200).json({status: "Success", data: results});
    }
  });

 
})
cron.schedule('* * * * *', () => {
const trainCity1 ={
  name: '',
  departureDate: "",
  fromCity: "city1",
  toCity: "city2",
};

const trainCity2 ={
  name: '',
  departureDate: "",
  fromCity: "city2",
  toCity: "city1",
};


const date = new Date();
date.setDate(date.getDate() +7);
const trainDate =date.toISOString().split('T') [0];
trainCity1.name = `${trainDate}-${trainCity1.toCity}-Express`;
trainCity2.name = `${trainDate}-${trainCity2.toCity}-Express`;
trainCity1.departureDate = trainDate;
trainCity2.departureDate =  trainDate;
const slqInsert = `INSERT INTO trainstable (name, fromCity, toCity, departureDate) VALUE ?`;
const values =[
  [trainCity1.name, trainCity1.fromCity , trainCity1.toCity , trainCity1.departureDate,],
  [trainCity2.name, trainCity2.fromCity , trainCity2.toCity , trainCity2.departureDate,]
]
db.query((slqInsert), [values], (errorInsert, results) =>{
  if(errorInsert){
    console.log("error insertinf train " + errorInsert);
  }
  else{
    console.log("Trains Inserted ");
  }
})
});

    app.post("/book", (req, res) =>{
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
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
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