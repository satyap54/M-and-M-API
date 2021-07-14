const express = require('express')
const router = express.Router()
const getSongById = require('./controllers/song/getSongById')

// For Testing
router.get("/", (req, res)=>{
  res.json(
    {
      "status" : "OK"
    }
  );
})

router.get("/ping", (req, res)=>{
  res.send("Alive");
})

// Song
router.get("/api/song/:song_id", getSongById);

module.exports = router;