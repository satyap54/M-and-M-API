const routes = require("./routes")
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


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


const listener = app.listen(process.env.PORT || 8000, ()=>{
  console.log(`App is listening on port ${listener.address().port}`);
})