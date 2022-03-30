const Review = require('../models/reviews');
const Field = require('../models/fields');

module.exports.createReview = async (req, res) => {
    const field = await Field.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    console.log(review);
    field.reviews.push(review);
    await review.save();
    await field.save();
    req.flash('success', 'Successfully made a new review!')
    res.redirect(`/fields/${field._id}`);
}

module.exports.deleteReview = async (req, res) =>{
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/fields/${id}`);
    }
    await Field.findByIdAndUpdate(id, { $pull: {reviews : reviewId}});  // remove Reivew have reviewId in Field.reviews
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted new review!')
    res.redirect(`/fields/${id}`);
} 