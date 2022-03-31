const mongoose = require('mongoose');


// create booking field schema
const bookingFieldSchema = new mongoose.Schema({
    status :{
        type: String,
        enum: ['Confirmed', 'Canceled', 'Ticketed', 'Voided'],
        default: 'Confirmed'
    },
    date_booking : {
        type: Date
    },
    time : String,
    price : Number,
    otp: String,
    field : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('BookingField', bookingFieldSchema);