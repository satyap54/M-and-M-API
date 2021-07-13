const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const songSchema = new Schema(
  {
    name : { type : String, required : true },
    song_url : { type : String, required : true },
    knox_hill_breakdown : { type : String, required : false },
    tags : { type : [String], required : true }
  },
  { timestamps : true }
)

const Song = model("Song", songSchema);
module.exports = Song;