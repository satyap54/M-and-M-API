const express = require('express')
const router = express.Router()

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



module.exports = router;