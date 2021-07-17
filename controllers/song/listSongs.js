const Song = require('../../models/Song');
const redisClient = require('../redis/redis');

/*
  Returns a paginated list of all songs, in no particular order
  
  @param {Object} query
  @param {number} [req.query.size = 10] Number of results per page
  @param {number} [req.query.page = 1] Page of results to return
*/

const listSongs = (req, res, next)=>{
  if(req.ipLimit){
    return res.status(429).send("Request Limit Exceeded !");
  }
  
  // If no query parameters are supplied, first ten songs are displayed
  let page = 1, size = 10;
  if(req.query.page)
    page = parseInt(req.query.page);
  if(req.query.size)
    size = parseInt(req.query.size);
  const skip = (page - 1) * size; 
  const key = `page=${page}size=${size}`;

  try{
    redisClient.get(key, async (err, data)=>{
      if(err)
        throw err;

      let songArr = [];
      if(data){
        songArr = JSON.parse(data);
      }else{
        try{
          songArr = await Song.find({})
            .select("name song_url song_id knox_hill_breakdown persona")
            .skip(skip)
            .limit(page);
          redisClient.set(key, JSON.stringify(songArr));
        }catch(err){
          return console.error(err);
        }
      }

      const responseJson = {
        "count" : songArr.length,
        "songs" : songArr
      }
      
      res.status(200).json(responseJson);
    })
  }catch(err){
    res.status(400).json(
      {
        "message" : err
      }
    )
  }
}

module.exports = listSongs;