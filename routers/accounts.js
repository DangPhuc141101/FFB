const express = require('express');
const passport = require('passport');

const Bookings = require('../models/booking_fields');
const router = express.Router();
const catchAsync = require('../utils/catchAsyncError');
const accountController = require('../controllers/accounts');

router.post('/register', catchAsync(accountController.createAccount))
// router.get('/login', accountController.loginForm)
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/fields' }), accountController.login)
router.get('/logout', accountController.logout);  
router.post('/create-owner', accountController.createOwner)
router.get('/history', async(req, res) =>{
    const bookings = await Bookings.find({user : req.user.id})
    .populate('field');;
    console.log(bookings)
    res.render('fields/detailOrder', {bookings});
})
module.exports = router;