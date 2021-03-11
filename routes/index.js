const express = require('express');
const router = express.Router();

const TagController = require('../controllers/tags-temp')
router.get('/', function(req, res, next) {
  res.send('Yeah')
});

router.post('/insertTag', function(req,res,next){
  console.log(req.body);
  let tagss = new TagController;
  tagss.updateTag(req.body.tag,"sujet");
  res.send("done!")
})

module.exports = router;