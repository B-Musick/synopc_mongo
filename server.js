let express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express(),
    morgan     = require('morgan'),
    dotenv     = require('dotenv'),
    mongoose   = require('mongoose'); // Used for connecting to database, schema
    
// ROUTE IMPORTS
var indexRoutes = require('./routes/index');
var bookRoutes = require('./routes/books');
var synopsisRoutes = require('./routes/synopsis');

// SCHEMA IMPORTS
let Book = require('./models/book');
let Synopsis = require('./models/synopsis');


// IMPORT SEED
var bookSeedDB = require('./bookSeed.js');
var synopsisSeedDB = require('./synopsisSeed.js');


// METHOD-OVERRIDE FOR UPDATE ROUTE
var methodOverride = require('method-override');

// *** config file - FOR TESTING *** //
var config = require('./_config');

// Middleware to help process requests, it can go in POST request and retrieve data
// USE BODY PARSER TO GET FORM BODY
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set up the .env file to access through process.env.VALUE
dotenv.config();

// PREVENTS ANY BACKLASH FROM DIRECTORY CHANGES
// ACCESS STYLESHEETS AND SCRIPTS WITH href="/stylesheets" or src='/scripts'
app.use(express.static("./public"));

// Log requests to the console
app.use(morgan('dev'));

// SET VIEW ENGINE SO DONT HAVE TO TYPE .ejs WHEN RENDER
app.set('view engine', 'ejs'); 

// ROUTE INTEGRATION
app.use('/', indexRoutes);
app.use('/books', bookRoutes);
app.use('/synopsis', synopsisRoutes);


// METHOD-OVERRIDE
app.use(methodOverride('_method'));

/***************************** DATABASES **************************************/

// CONNECT THE DATABASE RUNNING ON DEFAULT PORT 27017
// mongoose.connect("mongodb://localhost:27017/synop-c"), { useNewUrlParser: true }; 

/*** FOR TEST DATABASE ***///
mongoose.connect(config.mongoURI[app.settings.env], function (err, res) {
    if (err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
    }
});

// CALL SEED
// bookSeedDB();
synopsisSeedDB();

// START THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

module.exports = app