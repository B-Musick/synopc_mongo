let express = require('express');
    router = express.Router();
    dotenv = require('dotenv');

let Book = require('../models/book');

// Set up the .env file to access through process.env.VALUE
dotenv.config();

router.get('/',(req,res)=>{
    // Links for left-navbar.js
    let bookLinks = ['search books', 'create book'];
    let synopsisLinks = ['write synopsis'];

    Book.find({}, (err, foundBooks) => {
        err ? console.log(err) : res.render('books/index', { books: foundBooks, bookLinks, synopsisLinks });
    });
});

module.exports = router;