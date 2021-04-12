const express = require('express');
const app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser')

require('dotenv').config()

const con = require('./config/connection');

const port = process.env.PORT || 8080;




app.use(express.json());

app.use(cors({
  origin : ['https://marketplace-lupin.herokuapp.com'],
  credentials : true
}));





app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const delevryManRoutes = require("./routes/deliveryMan");
const adsRoutes = require("./routes/ads");
const checkoutRoutes = require("./routes/checkout");
const orderRoutes = require("./routes/order");
const accountTypeRoutes = require("./routes/accountType");
// const accountTypeRoutes = require("./routes/accountType");


app.use('/admin', adminRoutes);
app.use('/', userRoutes);
app.use('/product', productRoutes);
app.use('/deliveryMan', delevryManRoutes);
app.use('/ads', adsRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/order', orderRoutes);
app.use('/accountType', accountTypeRoutes);
// app.use('/accountType', accountTypeRoutes);



module.exports =app;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }) 



