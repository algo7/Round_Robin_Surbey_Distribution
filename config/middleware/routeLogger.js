// Winston Logger
const routeLog = require('../system/logs').get('routeLog');

// The route logger function
const routeLogger = (req, res, next) => {

    // Get the path
    const { method, url, } = req;

    // Status Code
    const statusCode = res.statusCode;

    // Log the route visited
    routeLog.http(`${method}:${url}:${statusCode}:${req.ip}`);

    // Move to the next middleware
    next();
};

// Export the functions
module.exports = { routeLogger, };