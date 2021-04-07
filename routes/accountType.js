const express = require('express');
const router = express.Router();
const accountTypeController = require('../controllers/accountType.controller');
const auth = require('../middleware/rootAuth')



router.post('/upgradeAccount',auth.verifyUserToken,  accountTypeController.UpgradeAccount);






module.exports = router;