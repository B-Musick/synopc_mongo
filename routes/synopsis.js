let express = require('express');
router = express.Router();
dotenv = require('dotenv');

let Book = require('../models/book');
let Synopsis = require('../models/synopsis');
var middleware = require('../middleware');


// Set up the .env file to access through process.env.VALUE
dotenv.config();

router.get('/', (req, res) => {
    /* Synopsis homepage */

    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'];
    let synopsisLinks = ['write synopsis'];

  
    Synopsis.find({}, (err, foundSynopsis) => {
        err ? console.log(err) : res.render('synopsis/index', { synopses: foundSynopsis, bookLinks, synopsisLinks,book:'' });
    });
});

// /************ ADD SYNOPSIS TO DATABASE ***********/

// NEW ROUTE (synopsis/create)
router.get('/:author&:title/write', middleware.isLoggedIn,(req, res) => {
    Book.findOne({author:req.params.author,title:req.params.title},(err,bookFound)=>{
        res.render('synopsis/new',{book_title: req.params.title, book_author: req.params.author,book:bookFound})
    })
});

// CREATE ROUTE (/synopsis)
router.post('/:author&:title', (req, res) => {
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    var newSynopsis = {
        book_author: req.body.book_author,
        book_title: req.body.book_title,
        book_image: req.body.book_image,
        author,
        body: req.body.body
    };

    Synopsis.create(newSynopsis, (err, synopsis) => {
        err ? console.log(err) : res.redirect('/synopsis');
    });
});

// SHOW ROUTE FIND ALL BY 
router.get('/:author&:title', (req, res) => {

    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'];
    let synopsisLinks = ['write synopsis'];

    Synopsis.find({ book_title: req.params.title }, (err, foundSynopses) => {
        console.log(foundSynopses);

        err ? console.log(err) : res.render('synopsis/showAll', { synopses: foundSynopses, id:req.params.id, bookLinks, synopsisLinks,book:'' });
    });
});
// SHOW ROUTE FIND ALL BY 
router.get('/:id', (req, res) => {
    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'];
    let synopsisLinks = ['write synopsis'];

    Synopsis.findById(req.params.id, (err, foundSynopses) => {
        err ? console.log(err) : res.render('synopsis/show', { synopses: foundSynopses, bookLinks, synopsisLinks, book:'' });
    });
});

// EDIT ROUTE
router.get('/:id/edit', middleware.checkSynopsisOwnership, (req, res) => {
    Synopsis.findById(req.params.id,  (err, foundSynopses) => {
        err ? res.redirect('/synopsis') : res.render('synopsis/edit', { synopses: foundSynopses });
    });
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {
    Synopsis.findByIdAndUpdate(req.params.id, req.body, (err, updatedBook) => {
        err ? res.redirect('synopsis') : res.redirect('/synopsis/' + req.params.id);
    });
});

// DELETE ROUTE
router.delete('/:id', middleware.checkSynopsisOwnership, (req, res) => {
    Synopsis.findByIdAndRemove(req.params.id, (err, removedSynopsis) => {
        err ? res.redirect('/synopsis') : res.redirect('/synopsis');
    });
});

module.exports = router;