// Dependencies
const express = require('express');
const router = express.Router();

// Controllers
const { main, } = require('../controller/main');


// Get all the db contents
router.get('/', main);

//Export the Module
module.exports = router;