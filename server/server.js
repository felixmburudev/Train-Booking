const express = require('express');
const bookRoute =require("./routes/bookTrain")
const searchTrainRoute =require("./routes/searchTrain")
const nextTrainRoute = require("./routes/nextTrain")
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000

app.get("/search", searchTrainRoute)
app.get('/nextTrain', nextTrainRoute);
app.post("/book", bookRoute);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
