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

describe("SynopC Database", ()=> {
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

    Book.collection.drop();
    
    // Seed the database with books before testing
    beforeEach(done=>{ bookSeedDB(); done(); });

    // Delete books from database before testing
    afterEach(done => { Book.collection.drop(); done(); });

    describe("GET /books", function () {
        it("Returns list of all books from database", function (done) {
            chai.request(server)
                .get('/books')
                .end(function (error, response) {
                    response.should.have.status(200);
                    data.forEach(book=>{
                        response.text.should.include(book.title);
                    });
                    done();
                });
        });
    });

    describe("GET /books/:title$:author", function () {
        it("Returns list of all books from database", function (done) {
            chai.request(server)
                .get('/books')
                .end(function (error, response) {
                    response.should.have.status(200);
                    data.forEach(book => {
                        response.text.should.include(book.title);
                    });
                    done();
                });
        });
    });
});
