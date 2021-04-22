// Redis
const { lpushAsync, rpopAsync, } = require('../config/dataBase/redis');

// Async Handler
const asyncHandler = require('../config/middleware/asyncHandler');

// Custom Error Class
const ErrorResponse = require('../config/misc/customErrorClass');


// @desc Get the survey link
// @route GET /
// @access Public
const main = asyncHandler(async (req, res, next) => {

});


module.exports = { main, };