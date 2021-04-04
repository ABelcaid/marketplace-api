const mongoose = require('mongoose');
require('dotenv').config()




mongoose.connect(process.env.DB_CONNECTION , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    
  }).then(() => {
    console.log("Successfully connected to the database");  
 
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    
  });
