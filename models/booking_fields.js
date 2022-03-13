const mongoose = require('mongoose');


// create booking field schema
const bookingFieldSchema = new mongoose.Schema({
    status :{
        type: String,
        enum: ['Confirmed', 'Canceled', 'Ticketed', 'Voided']
    },
    field : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.Model('BookingField', bookingFieldSchema);