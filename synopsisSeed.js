
var Synopsis = require('./models/synopsis');

var data = [
    // Starter seed data for blog
    {
        book_image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925020l/248756.jpg',
        book_author: 'David Suzuki',
        book_title: 'Tree',
        author: 'Brendan Musick',
        body: 'This book was really good.'
    
    },
    {
        book_image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1429540203l/32276.jpg',
        book_author: 'Carl Sagan',
        book_title: 'Dragons of Eden',
        author: 'Brendan Musick',
        body: 'This book was really good.'
   
    }
]

synopsisSeedDB = () => {
    Synopsis.deleteMany({}, (err) => {
        // Remove all existing books
        if (err) console.log(err);
        console.log('removed Synopsis!');

        data.forEach((seed) => {
            // Loop through the books outlines, create them with seed data
            Synopsis.create(seed, (err, synopsis) => {
                // Create book and return 'book' instance
                if (err) console.log(err);
                else console.log('Added ' + synopsis.author + '\'s synopsis! ');
            });


        });
    });
    return data;
};

module.exports = synopsisSeedDB;