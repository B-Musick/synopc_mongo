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

router.get('/:id', (req, res) => {
    /* 
        Books homepage which will show the various books in the database which 
        have had synopsis written recently.
    */
    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'];
    let synopsisLinks = ['write synopsis'];

    Book.findById(req.params.id, (err, foundBook) => {
        err ? console.log(err) : res.render('books/show', { book: foundBook, bookLinks, synopsisLinks });
    });
});

module.exports = router;