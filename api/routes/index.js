const express = require('express');
const router = express.Router();
 
router.get('/', function(req, res, next) {
  res.send('Yeah')
});

router.post('/insert', function(req,res,next){
  console.log(req.body);
  const { name, roll2, roll1 } = req.body;
  console.log(name, roll1, roll2);
  res.send('Yoyos')
})
module.exports = router;