const express = require('express');
const bookRoute =require("./routes/bookTrain")
const searchTrainRoute =require("./routes/searchTrain")
const nextTrainRoute = require("./routes/nextTrain")
const cors = require('cors');
const createMysqlTables = require('./config/mysqlTableCreator');
const cron = require("node-cron");
const trainScheduler = require('./controller/trainScheduler')


const app = express();
app.use(cors());
app.use(express.json());
const port = 3000

// function to create tables
createMysqlTables()
cron.schedule('* * * * *', ()=> {
  trainScheduler()
});
//insert a train
app.get("/search", searchTrainRoute)
app.get('/nextTrain', nextTrainRoute);
app.post("/book", bookRoute);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
