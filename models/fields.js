const mongoose = require('mongoose');

// Create image schema
const imageSchema = new mongoose.Schema({
    url: String,
    filename: String
})

// Create price schema
const priceSchema = new mongoose.Schema({
    start: String,
    end: String,
    price: Number
})

// Create field schema
const fieldSchema = new mongoose.Schema({
    name: String,
    prices: [priceSchema],
    category: String,
    description: String,
    images: [imageSchema],
    address: String,
    utilities: [String],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Field', fieldSchema);