const mongoose = require('mongoose');
const config = require('../config/index');

//configure database and mongoose
mongoose
  .connect(config.dbUri,{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB database connection established'))
  .catch(err => console.log(err));