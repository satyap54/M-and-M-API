const redisClient = require('../../controllers/redis/redis')
const moment = require('moment')

const { MAX_WINDOW_REQUEST_COUNT, WINDOW_SIZE_IN_SECONDS } = process.env;
const TTL = 3 * WINDOW_SIZE_IN_SECONDS;


const rateLimiter = (req, res, next)=>{
  console.log("here");
  const currentTime = moment().unix();
  const currWindow = parseInt(currentTime / WINDOW_SIZE_IN_SECONDS),
    prevWindow = parseInt((currentTime - WINDOW_SIZE_IN_SECONDS) / WINDOW_SIZE_IN_SECONDS);
  const difference = currentTime - currWindow * WINDOW_SIZE_IN_SECONDS, elapsedFraction = difference / (WINDOW_SIZE_IN_SECONDS * 1.0);
    
  try{ 
    const currKey = `${req.ip}:${currWindow}`, prevKey = `${req.ip}:${prevWindow}`
    redisClient.get(currKey, (err, currCount)=>{
      if(err){
        throw err;
      }
      
      if(!currCount){
        redisClient.setex(currKey, TTL, 1);
        currCount = 0;
      }else
        currCount = parseInt(currCount);
      
      redisClient.get(prevKey, (err, prevCount)=>{
        if(err)
          throw err;
        
        if(!prevCount)
          prevCount = 0;
        
        const totalHits = (1.0 - elapsedFraction) * prevCount + currCount;
        //console.log(prevCount, currCount, totalHits, MAX_WINDOW_REQUEST_COUNT);
        if(totalHits > parseInt(MAX_WINDOW_REQUEST_COUNT)){
          req.ipLimit = "true";
        }else{
          redisClient.incr(currKey);
        }

        next();
      }); 
    })
  }catch(err){
    next(err);
  }
}

module.exports = rateLimiter;