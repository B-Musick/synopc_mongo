var mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    image: String,
    author:  String,
    title: String
});

module.exports = mongoose.model('Book', bookSchema);