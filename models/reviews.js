const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

// Create reviewSchema
const reviewSchema = new mongoose.Schema({
    rating: Number,
    commnent: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.Model('Review', reviewSchema);