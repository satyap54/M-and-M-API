const Quote = require('../../models/Quote');
const redisClient = require('../redis/redis');


/*
  Returns the quote with the particular id

  @param {Object} params
  @param { String } [req.params.quote_id] quote_id of a particular quote
*/

const getQuoteById = (req, res)=>{
  if(req.ipLimit){
    return res.status(429).send("Request Limit Exceeded !");
  }

  const { quote_id } = req.params; 
  redisClient.get(`quote${quote_id}`, async (err, quote)=>{
    if(err){
      res.status(500);
      return console.error(err);
    }
    if(quote){
      return res.json(JSON.parse(quote));
    }
    try{
      const result = await Quote.findOne({ _id : quote_id })
        .select("content song_name song_id")
        .exec();
      if(!result){
        return res.status(404);
      }
      redisClient.set(`quote${quote_id}`, JSON.stringify(result));
      res.status(200).json(result);
    }catch(err){
      res.status(400);
      return console.error(err);
    }
  });
}

module.exports = getQuoteById;