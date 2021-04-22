// Winston Logger
const appLog = require('../system/logs').get('appLog');

// Error handling middleware
const errorHandler = async (err, req, res, next) => {

    // Make a copy of the error object
    let cErr = { ...err, };
    cErr.message = err.message;


    // If stack trace logging is enabled
    if (err.logStack === false) {
        appLog.error(`Path: ${req.path} | Stack: ${err.message}`);
        // Send the response to the front end
        return res
            .status(cErr.statusCode || 500)
            .json({ msg: cErr.message || 'Server Error', });

    } else {
        // Log the error
        appLog.error(`Path: ${req.path} | Stack: ${err.stack}`);

        // Send the response to the front end
        return res
            .status(cErr.statusCode || 500)
            .json({ msg: cErr.message || 'Server Error', });
    }
};

module.exports = errorHandler;