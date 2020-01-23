var mongoose = require('mongoose');

let synopsisSchema = new mongoose.Schema({
    book_image: String,
    book_author: String,
    book_title: String,
    author: String,
    body: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Synopsis', synopsisSchema);