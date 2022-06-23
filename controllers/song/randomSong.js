const Song = require('../../models/Song');
const personasArr = ["B-Rabbit", "SlimShady", "Eminem", "MarshallMathers"];

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/*
    Returns details of random song

    @param {Object} query
    @param {String} [req.query.persona] fetch a random song with this persona
      enum = ["B-Rabbit", "SlimShady", "Eminem", "MarshallMathers"]
*/
const randomSong = async (req, res)=>{
  try{
    const filter = {};
    if(req.query.persona){
      filter['persona'] = req.query.persona;
    }

    const queryset = await Song
      .find(filter, { _id : 0})
      .select("name song_url song_id knox_hill_breakdown persona")
      .exec(); 
    const lb = 0, ub = queryset.length;
    if(ub == 0){
      return res.status(404).send("Could not find any song");
    }
    return res.status(200).json(
      {
        "song" : queryset[random(lb, ub)]
      }
    )
  }catch(err){
    return console.error(err);
  }
}

module.exports = randomSong;