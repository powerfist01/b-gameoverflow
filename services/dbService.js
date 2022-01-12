const mongoose = require('mongoose');
const config = require('../config/index');

//configure database and mongoose
mongoose
  .connect(config.dbUri,{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log('Error in connecting to MongoDB!!!'));