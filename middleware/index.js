let middlewareObj = {},
    Book = require('../models/book'),
    Synopsis = require('../models/synopsis');

middlewareObj.isLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()) return next() 
    res.redirect('/login');
}
middlewareObj.checkSynopsisOwnership = (req,res, next) => {
    if (req.isAuthenticated()) {
        Synopsis.findById(req.params.id, (err, foundSynopsis) => {
            if (err) res.redirect('/synopsis');
            else {
                foundSynopsis.author.id.equals(req.user.id) ? next() : res.redirect('/synopsis');
            }
        });
    } 
    else res.redirect('/synopsis');
}


module.exports = middlewareObj;