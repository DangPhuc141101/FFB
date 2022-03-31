const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');
const Fields = require('../models/fields');
const Bookings = require('../models/booking_fields');

router.post('/time/:id', async(req, res) => {
    const { date } = req.query;
    const { id } = req.params;
 
    const bookings = await Bookings.find({date_booking : date , field: id});
    const booking_times = bookings.map(booking => booking.time);
    const field = await Fields.findById(id);
   
    const times = field.times.filter(time => {
        return (!booking_times.includes(time));
    }) 
    res.json({data : times});
})

function getPrice(field, hour) {
    for (let price of field.prices)
    {
        if (parseInt(hour) >= parseInt(price.start) && parseInt(hour) < parseInt(price.end))
            return price.price;
    }
    return 0;
}

router.delete('/delete/:id', async (req, res) => {
    console.log("delete")
    const { id } = req.params;
    const booking = await Bookings.findByIdAndDelete(id);
    req.flash('success', 'Successfully cancel booking!')
    res.redirect('/accounts/history');
})

router.post('/price/:id', async(req, res) => {
    const { id } = req.params;
    const { time } = req.query;
    const hours = time.split(':');

    const field = await Fields.findById(id);
    const price = getPrice(field, hours[0]);
    res.json({data : price});
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const field = await Fields.findById(id);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0'), mm = String(today.getMonth() + 1).padStart(2, '0'), yyyy = today.getFullYear();

    const day = yyyy + '-' + mm + '-' + dd;
    res.render('form/orderFieldForm', {id, field, today : day});
})

router.post('/:id', bookingController.createBooking);


module.exports = router;