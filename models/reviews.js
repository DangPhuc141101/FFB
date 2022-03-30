const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

// Create reviewSchema
const reviewSchema = new mongoose.Schema({
    rating: Number,
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
})

module.exports = mongoose.model('Review', reviewSchema);