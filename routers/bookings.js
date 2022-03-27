const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');

router.post('/', bookingController.createBooking);

router.delete('/', (req, res) => {
    res.send("Cancel field");
})

module.exports = router;