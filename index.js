const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const rateLimiter = require('./middlewares/rateLimiter/slidingWindow');
// const Song = require('./models/Song');
// const Quote = require('./models/Quote');


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

app.use(rateLimiter);
app.use(routes);
app.use(cors());
app.use(bodyParser.json());

/*
  Admin only routes. Will soon add role-based permissions.
*/

/*
app.post("/api/song/add", 
  (req, res)=>{
    Song.create(req.body, (err, data)=>{
      if(err)
        return console.error(err);
      res.json(data);
    })   
  }
)

app.post("/api/quote/add", 
  (req, res)=>{
    Quote.create(req.body, (err, data)=>{
      if(err)
        return console.error(error)
      res.json(data);
    })
  }
)
*/

const listener = app.listen(process.env.PORT || 8000, ()=>{
  console.log(`App is listening on port ${listener.address().port}`);
})

module.exports = app;
