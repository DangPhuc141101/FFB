const Booking = require('../models/booking_fields');
const Fields = require('../models/fields');
const Account = require('../models/accounts');
const nodemailer = require('nodemailer');

function getPrice(field, hour) {
  for (let price of field.prices) {
    if (parseInt(hour) >= parseInt(price.start) && parseInt(hour) < parseInt(price.end))
      return price.price;
  }
  return 0;
}

function randomOtp() {
  return `${Math.floor(1000 + Math.random() * 9000)}`;
}

async function sendMailToUser(otp, email) {
  console.log(process.env.MY_GMAIL)
  console.log(process.env.PASS_GMAIL)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_GMAIL,
      pass: process.env.PASS_GMAIL
    },
  })

  await transporter.sendMail({
    from: process.env.MY_GMAIL,
    to: email,
    subject: "MÃ XÁC NHẬN ĐẶT SÂN",
    text: `Đây lầ mã xác nhận của bạn -- ${otp} --`,
  }, (err) => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports.createBooking = async (req, res) => {
  const { date, time } = req.body;
  const { id } = req.params;

  const hours = time.split(':');
  const field = await Fields.findById(id);
  const otp = randomOtp();
  const price = getPrice(field, hours[0]);

  const booking = new Booking({ date_booking: date, price, time, otp });
  booking.field = id;
  booking.user = req.user._id;
  booking.save();
  await sendMailToUser(otp, req.user.email);
  res.redirect('/fields/' + id);
}