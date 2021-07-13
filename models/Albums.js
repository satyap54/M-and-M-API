const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const albumSchema = new Schema(
  {
    description : { type : String, required : true },
    album_url : { type : String, required : true },
    year : { type : Number, required : true },
    songs_list : { type : [String], required : true }
  },
  { timestamps : true }
)

const Album = model("Album", albumSchema);
module.exports = Album;