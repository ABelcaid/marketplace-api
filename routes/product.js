const express = require('express');
const router = express.Router();
const productController = require('../controllers/produt.controller');
const auth = require('../middleware/rootAuth')



router.post('/addProduct',  auth.verifyUserToken , productController.addProduct);

router.get('/myProducts',  auth.verifyUserToken , productController.sellerProducts);

router.get('/productByCategory/:category/:length', productController.productByCategory);

router.get('/productById/:id', productController.productById);





module.exports = router;