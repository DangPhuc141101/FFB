const Booking = require('../models/booking_fields');
const Field = require('../models/fields');
const Account = require('../models/accounts');
const messagebird = require('messagebird')(process.env.API_KEY_MESSAGE);

module.exports.createBooking = async (req, res) => {
  const { date, price } = req.body;
  const booking = new Booking({ date, price });
  booking.field = req.params.id;
  booking.user = req.user._id;
  const user = await Account.findById(req.user.id);
  console.log(user)
  if (user.phone) {
    messagebird.verify.create('+84935538497', {
      template: 'Your verification code is %token.'
    }, function (err, response) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(response);
        res.render('form/verifyToken', {id : response.id});
      }
    });
  }
  else {
    render.send('Have no phone')
  }
}