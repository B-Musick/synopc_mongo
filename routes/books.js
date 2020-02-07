let express = require('express');
    router = express.Router();
    dotenv = require('dotenv');

let Book = require('../models/book');
var middleware = require('../middleware');

// Set up the .env file to access through process.env.VALUE
dotenv.config();

router.get('/',(req,res)=>{
    /* 
        Books homepage which will show the various books in the database which 
        have had synopsis written recently.
    */
   
    Book.find({}, (err, foundBooks) => {
        err ? console.log(err) : res.render('books/index', { books: foundBooks });
    });
});

/************ ADD BOOK TO DATABASE ***********/

// NEW ROUTE (plants/create)
router.get('/create', middleware.isLoggedIn,(req, res) => { res.render('books/new') });

// CREATE ROUTE (/books)
router.post('/',  (req, res) => {
    var newBook = { author: req.body.author, title: req.body.title, image: req.body.image };
    Book.create(newBook, (err, book) => { err ? console.log(err) : res.redirect('/books'); });
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'],synopsisLinks = ['write synopsis'];

    Book.findById(req.params.id,(err,foundBook)=>{
        err ? console.log(err) : res.render('books/show', { book: foundBook, bookLinks, synopsisLinks });
    });
});

// EDIT ROUTE
router.get('/:id/edit', middleware.isLoggedIn,(req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        err ? res.redirect('/books') : res.render('books/edit', { book: foundBook });
    });
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, (err, updatedBook) => {
        err ? res.redirect('books') : res.redirect('/books/' + req.params.id);
    });
});

// DELETE ROUTE
router.delete('/:id',  (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, removedBook) => {
        err ? res.redirect('/books') : res.redirect('/books');
    });
});

module.exports = router;