const express = require('express');
const bookRoute =require("./routes/bookTrain")
const searchTrainRoute =require("./routes/searchTrain")
const nextTrainRoute = require("./routes/nextTrain")
const cors = require('cors');
const createMysqlTables = require('./config/mysqlTableCreator');
const cron = require("node-cron");
// const http = require('http');
const getTrainSeats =require('./routes/getTrainSeats')
const trainScheduler = require('./controller/trainScheduler')
const delete_old_trains = require('./controller/deleteTrains')
// const liveTrain = require('./controller/liveTrain')

const app = express()
app.use(cors());
app.use(express.json());
const port = 3000


createMysqlTables()
cron.schedule('0 9 * * *', ()=> {
  trainScheduler()
  delete_old_trains()
});
//insert a train
app.get("/search", searchTrainRoute)
app.get('/nextTrain', nextTrainRoute);
app.post("/book", bookRoute);
app.get('/getSeats', getTrainSeats)

// // sockwr
// const server = http.createServer(app)
// liveTrain.initLiveTrainUpdates(server);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
