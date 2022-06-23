const Song = require('../../models/Song');
const redisClient = require("../redis/redis");

/*
  Returns details of a song
  
  @param {Object} params
  @param { Number } [req.param.song_id] song_id of the song whose 
    details is to be fetched
*/

const getSongById = (req, res, next)=>{
  const { song_id } = req.params;
  redisClient.get(`song${song_id}`, async (err, data)=>{
    if(err){
      res.status(500);
      return console.error(err);
    }
    if(data){
      return res.json(JSON.parse(data));
    }
    try{
      const result = await Song.findOne({ song_id : song_id }, { _id : 0})
        .select("name song_url song_id knox_hill_breakdown persona")
        .exec();
      if(!result){
        res.status(404).json(
          {
            status : 404,
            message : "Song with this id doesn't exist"
          }
        )
      }else{
        redisClient.set(`song${song_id}`, JSON.stringify(result));
        res.status(200).json(result);
      }
    }catch(err){
      console.error(err);
      res.status(400).json(
        {
          "message" : err
        }
      )
    }
  })
}

module.exports = getSongById;