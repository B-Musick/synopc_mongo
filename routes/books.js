let express = require('express');
    router = express.Router();
    
    dotenv = require('dotenv');

// Set up the .env file to access through process.env.VALUE
dotenv.config();

router.get('/',(req,res)=>{
    res.render('books/index');
});

module.exports = router;