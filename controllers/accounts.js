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
        res.redirect('/fields');
    })
   }
   catch(e) {
       console.log(e);
   } 
 }

// handle when user login to website
module.exports.login = async(req, res) => {
    res.redirect('/fields');
}

module.exports.loginForm = (req, res) => {
    res.render('accounts/login');
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/fields');
}

module.exports.createOwner = async(req, res) => {
    try {
     const { email, username, password } = req.body; 
     const account = new Account({ email, phone : username, username, accountType : 'Owner' });
     const registerAccount = await Account.register(account, password);
     req.flash('success', 'Successfully made a new campground!');
     console.log("Register owner success!")
    }
    catch(e) {
        console.log(e);
    } 
 }

