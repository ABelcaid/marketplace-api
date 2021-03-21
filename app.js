const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

require('dotenv').config()

const con = require('./config/connection');

const port = process.env.PORT || 8080;




app.use(express.json());
app.use(cors({
  origin : ['http://localhost:3000'],
  credentials : true
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())


const adminRoutes = require("./routes/admin");


app.use('/admin', adminRoutes);





module.exports =app;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }) 



