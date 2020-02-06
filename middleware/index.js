let middlewareObj = {},
    Book = require('../models/book'),
    Synopsis = require('../models/synopsis');

middlewareObj.isLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()) return next() 
    res.redirect('/login');
}
middlewareObj.checkSynopsisOwnership = (res, req, next) => {
    if (req.isAuthenticated()) {
        Synopsis.findById(req.params.id, (err, foundSynopsis) => {
            if (err) res.redirect('back');
            else {
                foundPlant.author.id.equals(req.user.id) ? next() : res.redirect('back');
            }
        });
    } 
    else res.redirect('back');
}

module.exports = middlewareObj;