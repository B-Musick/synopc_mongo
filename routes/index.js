var express = require('express');
var router = express.Router();

// LANDING PAGE
router.get('/',(req,res)=>{res.render('landing');});

module.exports = router;