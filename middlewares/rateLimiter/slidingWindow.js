const redisClient = require('../../controllers/redis/redis')
const moment = require('moment')

const { MAX_WINDOW_REQUEST_COUNT, WINDOW_SIZE_IN_SECONDS } = process.env;
const TTL = 3 * WINDOW_SIZE_IN_SECONDS;

/*
  Rate Limiter using sliding window 
  Ref. https://medium.com/@SaiRahulAkarapu/rate-limiting-algorithms-using-redis-eb4427b47e33
*/

const rateLimiter = (req, res, next)=>{
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
      
      // If request is made for the first time in the current window, it's count is 0, otherwise, fetch it from redis
      if(!currCount){
        redisClient.setex(currKey, TTL, 1);
        currCount = 0;
      }else
        currCount = parseInt(currCount);
      
      redisClient.get(prevKey, (err, prevCount)=>{
        if(err)
          throw err;
        
        // If no request is made in the previous window, the count of previous window is 0
        if(!prevCount)
          prevCount = 0;
        
        /*
          we calculate the weighted count of the previous window, for example, 
          if the current window time has been elapsed by 30%, 
          then we weight the previous window’s count by 70%
        */
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