const Account = require('../models/accounts');

// Register account
module.exports.createAccount = async(req, res) => {
   try {
    const { email, username, password } = req.body; 
    const account = new Account({ email, phone : username, username });
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

// handel when user login to website
module.exports.login = async(req, res) => {
    res.redirect('/');
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

