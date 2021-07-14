const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Song = require('./models/Song');

try{
  mongoose.connect(
    process.env["MONGO_URI"],
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    }
  )
}catch(error){
  console.error(error);
}

app.use(routes);
app.use(cors());
app.use(bodyParser.json());

app.post("/api/song/add", 
  (req, res)=>{
    Song.create(req.body, (err, data)=>{
      if(err)
        return console.error(err);
      res.json(data);
    })   
  }
)

const listener = app.listen(process.env.PORT || 8000, ()=>{
  console.log(`App is listening on port ${listener.address().port}`);
})