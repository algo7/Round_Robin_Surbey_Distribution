// Dependencies
const express = require('express');
const compression = require('compression');
const { routeCheck, } = require('express-suite');

// Winston Logger
const appLog = require('./config/system/logs').get('appLog');

//  Custom Middlwares
const errorHandler = require('./config/middleware/errorHandler');
const { routeLogger, } = require('./config/middleware/routeLogger');


// Global Constant
const PORT = process.env.PORT || 3002;

// Initialize the App
const app = express();

app.use(compression());

//  BodyParser Middleware
app.use(express.urlencoded({
    extended: true,
    limit: '5mb',
}));

app.use(express.json({
    limit: '5mb',
    extended: true,
}));


// Disable etag and x-powered-by to prevent header grabbing
app.set('etag', false);
app.set('x-powered-by', false);


app.all('*', (req, res, next) => {

    //  Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    //  Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //  Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    // No cache
    res.setHeader('Cache-Control', 'no-store');

    next();
});


// Route Logger
app.use(routeLogger);

// Load Routes
const Main = require('./route/main');

// Use routes
app.use('/', Main);

// Custom Error Handler
app.use(errorHandler);

// Route Check
app.use(routeCheck(app));

// Start the app
app.listen(PORT, () => {
    appLog.info(`Server is listening in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
