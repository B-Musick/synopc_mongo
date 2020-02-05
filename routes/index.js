var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// LANDING PAGE
router.get('/',(req,res)=>{res.render('landing');});

/************************* PASSPORT AUTH **********************************/
router.get('/register',(req,res)=>{res.render('register')});

router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username });

    User.register(newUser, req.body.password, (err, user) => {
        err ? res.render('register'): passport.authenticate('local')(req, res, () => res.redirect('/'));  
    });
})

module.exports = router;