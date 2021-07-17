const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const shortid = require('shortid');

const quoteSchema = new Schema(
  {
    _id : { type : String, default : shortid.generate },
    content : { type : String, required : true },
    song_name : { type : String, required : false },
    song_id : { type : Number, required : false }
  }, 
  { timestamps : true }
)

const Quote = model("Quote", quoteSchema);
module.exports = Quote;