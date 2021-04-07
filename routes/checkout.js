const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');




router.post('/checkout',  checkoutController.checkout);






module.exports = router;