const Song = require('../../models/Song');
const redisClient = require("../redis/redis");


const getSongById = (req, res, next)=>{
  if(req.ipLimit){
    return res.status(429).send("Request Limit Exceeded !");
  }
  const { song_id } = req.params;
  redisClient.get(`song${song_id}`, async (err, data)=>{
    if(err){
      return console.error(err);
    }
    if(data){
      return res.json(JSON.parse(data));
    }
    try{
      const result = await Song.findById(song_id).exec();
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