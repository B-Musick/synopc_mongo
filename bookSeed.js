
var Book = require('./models/book');

var data = [
    // Starter seed data for blog
    {
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925020l/248756.jpg',
        author: 'David Suzuki',
        title: 'Tree'
    },
    {
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1429540203l/32276.jpg',
        author: 'Carl Sagan',
        title: 'Dragons of Eden'
    }
]

function bookSeedDB() {
    Book.deleteMany({}, function (err) {
        // Remove all existing books
        if (err) console.log(err); 
        console.log('removed book!');

        data.forEach((seed) => {
            // Loop through the books outlines, create them with seed data
            Book.create(seed, (err, book) => {
                // Create book and return 'book' instance
                if (err)  console.log(err);
                else console.log('Added '+ book.title+' ! ');
            });
        });
    });
};

module.exports = bookSeedDB;