const mongoose = require('mongoose');

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

module.exports = mongoose.model('Account', accountSchema);