
module.exports.isLoggedIn = (req, res, next) =>{
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in!');
       //return res.redirect('/accounts/login');
       return res.redirect('/fields');
    }
    next();
}
