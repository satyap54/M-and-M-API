const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const quoteSchema = new Schema(
  {
    content : { type : String, required : true },
    song_id : { type : Number, required : true},
    song_url : { type : String, required : false },
    album : { type : String, required : false },
    year :	{ type : Number, required : false },
    persona : { type : String, enum : ["B-Rabbit", "SlimShady", "Eminem", "Marshall Mathers"], required : false},
    tags : { type : [String], required : true }
  }, 
  { timestamps : true }
)

const Quote = model("Quote", quoteSchema);
module.exports = Quote;