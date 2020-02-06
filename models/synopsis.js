var mongoose = require('mongoose');

let synopsisSchema = new mongoose.Schema({
    book_image: String,
    book_author: String,
    book_title: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Refers to the model
        },
        username: String
    }, 
    body: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Synopsis', synopsisSchema);