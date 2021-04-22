// Dependencies
const express = require('express');
const router = express.Router();

// Controllers
const { main, info, } = require('../controller/main');


// Get the link
router.get('/', main);

// Get link stats
router.get('/info', info);


//Export the Module
module.exports = router;