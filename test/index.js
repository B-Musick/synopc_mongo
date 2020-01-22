let assert = require('assert');
    server = require('../server'); // Require the server file, its exported
// CHAI TEST SUITE
    // chai = require('chai');
    // chaiHttp = require('chai-http');
    // expect = chai.expect;
    // should = chai.should();
    // chai.use(chaiHttp);

    request = require("request"); //  Nodes request package to make request

    routes = require('../routes/index');

let base_url = 'http://localhost:3000/';

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


