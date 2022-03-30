const express = require('express');
const router = express.Router({ mergeParams: true});

const catchAsync = require('../utils/catchAsyncError');
// const ExpressError = require('../utils/ExpressError');
// const { validateReview, isReviewAuthor, isLoggedIn } = require('../middleware');
const { isLoggedIn } = require('../middleware');
console.log("Mergeparams")
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn , catchAsync(reviews.deleteReview));

module.exports = router;