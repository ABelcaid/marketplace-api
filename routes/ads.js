const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.comtroller')
const auth = require('../middleware/rootAuth')




router.post('/addAds',auth.verifyRootToken,adsController.addAds);



router.get('/getAds', adsController.getAds);


router.delete('/deleteAds/:id',auth.verifyRootToken, adsController.deleteAds);






module.exports = router;