const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const auth = require('../middleware/rootAuth')




router.post('/register',userController.register);
router.post('/login',userController.login);

router.put('/activateAccount/:token', userController.activateAccount);


router.get('/loggedInUser', userController.loggedInUser);
router.get('/logout', userController.logOut);
router.get('/wantToBeSeller',auth.verifyUserToken , userController.wantToBeSellerList);
// router.get('/numListedProduct',auth.verifyUserToken , userController.getNumListedProduct);
router.get('/sellersList',auth.verifyRootToken , userController.getAllSellers);
router.get('/sellerStatistic',auth.verifyUserToken , userController.getStatistic);

router.put('/becomeSeller', userController.becomeSeller);

router.put('/makeItSeller/:id', userController.makeItSeller);


router.delete('/deleteSeller/:id',auth.verifyRootToken,  userController.deleteSeller);


// router.post('/add',  auth.verifyRootToken , userController.adduser);



// router.put('/updatePassword',auth.verifyRootToken,  userController.updatePassword);

// router.get('/logout', userController.activateAccount);
// router.get('/loggedInUser', userController.loggedIn);
// router.get('/all', auth.verifyRootToken  ,userController.getAlluser);




module.exports = router;