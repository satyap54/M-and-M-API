const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const getSongById = require('./controllers/song/getSongById');
const listSongs = require('./controllers/song/listSongs');
const randomSong = require('./controllers/song/randomSong');
const getQuoteById = require('./controllers/quote/getQuoteById');
const randomQuote = require('./controllers/quote/randomQuote');
const swaggerSetup = require('./swagger/swaggerSetup.json');

// Swagger UI
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerSetup));

// Testing
router.get("/ping", (req, res)=>{
  res.send("Alive");
})

// Song
router.get("/api/songs", listSongs);
router.get("/api/songs/random", randomSong);
router.get("/api/songs/:song_id", getSongById);
// search a song by it's name

// Quote
router.get("/api/quotes/random", randomQuote);
router.get("/api/quotes/:quote_id", getQuoteById);

// Albums
// list albums with ids - pagination
// fetch details of an album - it's songs with ids

module.exports = router;