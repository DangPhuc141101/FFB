const Account = require('../models/accounts');

// Register account
module.exports.createAccount = async(req, res) => {
   try {
    const { email, username, password } = req.body;
    console.log(req.body)
    const account = new Account({ email, username });
    const registerAccount = await Account.register(account, password);
    console.log("Register success!")
    req.login(registerAccount, err =>{
        if (err) return next(err);
        res.redirect('/');
    })
   }
   catch(e) {
       console.log(e);
   }
}

module.exports.login = async(req, res) => {
    res.redirect('/');
}

module.exports.logout = (req, res) => {
    req.logout();
}

