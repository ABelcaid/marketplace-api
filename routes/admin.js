const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller')
const auth = require('../middleware/rootAuth')


router.post('/',adminController.loginAdmin);
router.post('/add',  auth.verifyRootToken , adminController.addAdmin);

router.delete('/deleteAdmin/:id',auth.verifyRootToken,  adminController.deleteAdmin);

router.put('/updatePassword',auth.verifyRootToken,  adminController.updatePassword);

router.get('/logout', adminController.logOut);
router.get('/loggedIn', adminController.loggedIn);
router.get('/all', auth.verifyRootToken  ,adminController.getAllAdmin);




module.exports = router;