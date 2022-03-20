const express = require('express');
const router = express.Router();

router.post('/bookings', (req, res) => {
    res.send("Order field")
})

router.delete('/bookings', (req, res) => {
    res.send("Cancel field");
})

module.exports = router;