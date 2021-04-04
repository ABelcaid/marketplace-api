const express = require('express');
const app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser')

require('dotenv').config()

const con = require('./config/connection');

const port = process.env.PORT || 8080;




app.use(express.json());

app.use(cors({
  origin : ['http://localhost:3000'],
  credentials : true
}));



app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");


app.use('/admin', adminRoutes);
app.use('/', userRoutes);
app.use('/product', productRoutes);





module.exports =app;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }) 



