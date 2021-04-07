const express = require('express');
const router = express.Router();
const delevryManController = require('../controllers/delevryMan.controller')
const auth = require('../middleware/rootAuth')




router.post('/addDelevryMan',auth.verifyRootToken,delevryManController.addDeliveryMan);



router.get('/delevryManList',auth.verifyRootToken , delevryManController.getAllDeliveryMan);


router.delete('/deleteDelevryMan/:id',auth.verifyRootToken, delevryManController.deleteDeliveryMan);






module.exports = router;