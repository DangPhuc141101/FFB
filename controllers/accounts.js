const Account = require('../models/accounts');

// Register account
module.exports.createAccount = async(req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);

    // if (registerUser) {
    //     res.se
    // }
}