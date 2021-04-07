const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller')
const auth = require('../middleware/rootAuth')







router.get('/ordersList',auth.verifyRootToken , orderController.getAllOrders);




router.put('/:id',auth.verifyRootToken, orderController.validateOrder);








module.exports = router;