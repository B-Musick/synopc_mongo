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

// /************ ADD BOOK TO DATABASE ***********/

// // NEW ROUTE (plants/create)
// router.get('/create', (req, res) => {
//     res.render('books/new')
// });

// // CREATE ROUTE (/books)
// router.post('/', (req, res) => {
//     var newBook = {
//         author: req.body.author,
//         title: req.body.title,
//         image: req.body.image
//     };

//     Book.create(newBook, (err, plant) => {
//         err ? console.log(err) : res.redirect('/books');
//     });
// });

// // SHOW ROUTE
// router.get('/:title&:author', (req, res) => {

//     // Links for left-navbar.js
//     let bookLinks = ['search books', 'create book'];
//     let synopsisLinks = ['write synopsis'];

//     Book.findOne({ title: req.params.title, author: req.params.author }, (err, foundBook) => {
//         console.log(foundBook);

//         err ? console.log(err) : res.render('books/show', { book: foundBook, bookLinks, synopsisLinks });
//     });
// });

// // EDIT ROUTE
// router.get('/:title&:author/edit', (req, res) => {
//     Book.findOne({ title: req.params.title, author: req.params.author }, (err, foundBook) => {
//         err ? res.redirect('/books') : res.render('books/edit', { book: foundBook });
//     });
// });

// // UPDATE ROUTE
// router.post('/:title&:author', (req, res) => {
//     Book.findOneAndUpdate({ title: req.params.title, author: req.params.author }, req.body, (err, updatedBook) => {
//         console.log(updatedBook);
//         err ? res.redirect('books') : res.redirect('/books/' + req.params.title + "&" + req.params.author);
//     });
// });

// // DELETE ROUTE
// // router.delete('/:id',  (req, res) => {
// //     Book.findByIdAndRemove(req.params.id, (err) => {
// //         err ? res.redirect('/books') : res.redirect('/books');
// //     });
// // });

module.exports = router;