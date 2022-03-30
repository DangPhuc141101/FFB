const express = require('express');
const passport = require('passport');

const router = express.Router();
const catchAsync = require('../utils/catchAsyncError');
const accountController = require('../controllers/accounts');

router.post('/register', catchAsync(accountController.createAccount))
// router.get('/login', accountController.loginForm)
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/fields' }), accountController.login)
router.get('/logout', accountController.logout);  
router.post('/create-owner', accountController.createOwner)
module.exports = router;