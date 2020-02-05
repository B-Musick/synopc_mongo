let express = require('express');
router = express.Router();
dotenv = require('dotenv');

let Book = require('../models/book');
let Synopsis = require('../models/synopsis');

// Set up the .env file to access through process.env.VALUE
dotenv.config();

router.get('/', (req, res) => {
    /* Synopsis homepage */

    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'];
    let synopsisLinks = ['write synopsis'];

  
    Synopsis.find({}, (err, foundSynopsis) => {
        err ? console.log(err) : res.render('synopsis/index', { synopses: foundSynopsis, bookLinks, synopsisLinks });
    });
});

// /************ ADD SYNOPSIS TO DATABASE ***********/

// NEW ROUTE (synopsis/create)
router.get('/:author&:title/write', (req, res) => {
    res.render('synopsis/new',{book_title: req.params.title, book_author: req.params.author})
});

// CREATE ROUTE (/synopsis)
router.post('/:author&:title', (req, res) => {
    var newSynopsis = {
        book_author: req.body.book_author,
        book_title: req.body.book_title,
        book_image: req.body.book_image,
        author: req.body.author,
        body: req.body.body
    };

    Synopsis.create(newSynopsis, (err, synopsis) => {
        err ? console.log(err) : res.redirect('/synopsis');
    });
});

// SHOW ROUTE
router.get('/:author&:title&:id', (req, res) => {

    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'];
    let synopsisLinks = ['write synopsis'];

    Synopsis.find({ book_title: req.params.title }, (err, foundSynopses) => {
        console.log(foundSynopses);

        err ? console.log(err) : res.render('synopsis/show', { synopses: foundSynopses, id:req.params.id, bookLinks, synopsisLinks });
    });
});

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    Synopsis.findById(req.params.id,  (err, foundSynopses) => {
        err ? res.redirect('/synopsis') : res.render('synopsis/edit', { synopses: foundSynopses });
    });
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {
    Synopsis.findByIdAndUpdate(req.params.id, req.body, (err, updatedBook) => {
        console.log(updatedBook);
        err ? res.redirect('synopsis') : res.redirect('/synopsis/' + req.params.id);
    });
});

// // DELETE ROUTE
// // router.delete('/:id',  (req, res) => {
// //     Book.findByIdAndRemove(req.params.id, (err) => {
// //         err ? res.redirect('/books') : res.redirect('/books');
// //     });
// // });

module.exports = router;