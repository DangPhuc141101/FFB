const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    accountType:{
        type: String,
        enum : ["Admin", "User", "Owner"],
        default: "User"
    }
})

accountSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', accountSchema);