let assert = require('assert');
    server = require('../server'); // Require the server file, its exported
// CHAI TEST SUITE
    chai = require('chai');
    chaiHttp = require('chai-http');
    expect = chai.expect;
    should = chai.should();
    chai.use(chaiHttp);

    request = require("request"); //  Nodes request package to make request

    routes = require('../routes/index');
    bookRoutes = require('../routes/books');


let base_url = 'http://localhost:3000/';

let Book = require('../models/book');

// IMPORT SEED
var bookSeedDB = require('../bookSeed.js');

/******* HOW TO RUN
 * mocha
 * node test
 */


describe("Book Synopsis Server", function () {
    describe("GET /", function () {
        it("returns status code 200", function (done) {
            request.get(base_url, function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });
    describe("GET /", function () {
        it("returns status code 200", function (done) {
            request.get(base_url+'books', function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });

});

describe("SynopC Database",  ()=> {
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

    
    
    // Seed the database with books before testing
    beforeEach(done => { bookSeedDB(); done(); });
    // beforeEach(async (done) =>{
    //     var newBook = new Book(data[0]);
    //     // var newBook2 = new Book(data[1]);

    //     newBook.save();
    //     // newBook2.save();
    //     done();
    //     // newBook.save(function (err) {
    //     //     done();
    //     // });
    // });


    // Delete books from database before testing
    afterEach(done => { Book.collection.drop(); done(); });

    describe("GET /books", ()=>{
        it("Returns list of all books from database",  (done)=> {
            chai.request(server)
                .get('/books')
                .end((error, response)=> {
                    response.should.have.status(200);
                    
                    response.text.should.include(data[0].author);

                    // data.forEach(book => {
                    //     response.text.should.include(book.author);
                    // });
                    done();
                });
        });
    });

    // describe("GET /books/:title&:author", function () {
    //     it("Returns individual book from database", function (done) {
    //         chai.request(server)
    //             .get('/books/Tree&David Suzuki')
    //             .end(function (error, response) {
                
    //                 response.should.have.status(200);
    //                 response.text.should.include(data[0].title);
    //                 done();
    //             });
    //     });
    // });
});
