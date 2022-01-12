const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('Yeah! Server is running!!!')
});

module.exports = router;