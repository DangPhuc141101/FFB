const mongoose = require('mongoose');

// Create image schema
const imageSchema = new mongoose.Schema({
    url: String,
    filename: String
})

//  Create geometry schema
const geometrySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

// Create address schema
const addressSchema = new mongoose.Schema({
    streetAddreess: String,
    city: String,
    district: String,
    geometry: geometrySchema
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
    price: [priceSchema],
    category: String,
    description: String,
    images: imageSchema,
    address: addressSchema
})

module.exports = mongoose.model('Field', fieldSchema);