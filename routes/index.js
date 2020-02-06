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

/****** LOGIN ROUTES ******/
router.get('/login',(req,res)=>res.render('login'));

router.post('/login',passport.authenticate('local', // Authenticate local strategy
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }
),(req,res)=>{});
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;