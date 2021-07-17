const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const songSchema = new Schema(
  {
    name : { type : String, required : true, unique : true },
    song_url : { type : String, required : true },
    song_id : { type : Number, required : true, unique : true },
    knox_hill_breakdown : { type : String, required : false },
    persona : { type : String, enum : ["B-Rabbit", "SlimShady", "Eminem", "MarshallMathers"], required : true}
  },
  { timestamps : true }
)

const Song = model("Song", songSchema);
module.exports = Song;