const Quote = require('../../models/Quote');


/*
  Returns a random quote along with song details.
  For example, if the quote is from song 'Not Afraid' who's is is 6;
  The song details is of the format: 6. Not Afraid
*/
const randomQuote = async (req, res)=>{
  if(req.ipLimit){
    return res.status(429).send("Request Limit Exceeded !");
  }
  try{
    const [result] = await Quote.aggregate([
      { $sample: { size: 1 } }
    ]);
    const { _id, content, song_name, song_id } = result;
    res.json(
      {
        "quote" : content,
        "quote_id" : _id,
        "song" : `${song_id}. ${song_name}`
      }
    );
  }catch(err){
    return console.error(err);
  } 
}

module.exports = randomQuote;