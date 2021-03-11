const express = require('express');
const router = express.Router();
 
router.get('/', function(req, res, next) {
  res.send('Yeah')
});

router.post('/insert', function(req,res,next){
  console.log(req.body);
  res.send("done!")
})

module.exports = router;