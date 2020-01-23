let express = require('express');
    router = express.Router();
    dotenv = require('dotenv');

let Book = require('../models/book');

// Set up the .env file to access through process.env.VALUE
dotenv.config();

router.get('/',(req,res)=>{
    /* 
        Books homepage which will show the various books in the database which 
        have had synopsis written recently.
    */
    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'];
    let synopsisLinks = ['write synopsis'];

    Book.find({}, (err, foundBooks) => {
        err ? console.log(err) : res.render('books/index', { books: foundBooks, bookLinks, synopsisLinks });
    });
});

// NEW ROUTE (plants/create)
router.get('/create', (req, res) => {
    res.render('books/new')
});

// CREATE ROUTE (/books)
router.post('/',  (req, res) => {
    var newBook = {
        author: req.body.author,
        title: req.body.title,
        image: req.body.image
    };

    Book.create(newBook, (err, plant) => {
        err ? console.log(err) : res.redirect('/books');
    });
});

router.get('/:title&:author', (req, res) => {
    /* 
        Books homepage which will show the various books in the database which 
        have had synopsis written recently.
    */
    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'];
    let synopsisLinks = ['write synopsis'];

    Book.findOne({ title:req.params.title, author: req.params.author },(err,foundBook)=>{
        err ? console.log(err) : res.render('books/show', { book: foundBook, bookLinks, synopsisLinks });
    });
});

module.exports = router;