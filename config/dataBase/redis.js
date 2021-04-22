// Dependencies
const redis = require('redis');


// Winston Logger
const appLog = require('../system/logs').get('appLog');

// Connect to Redis
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: '6379',
    password: process.env.Redis_Pass,
})
    .once('connect', () => appLog.info('Redis Connected'))
    .on('error', err => appLog.error('Redis Connection Error: ' + err));



// Promisify redis query
const { promisify, } = require('util');
const lpushAsync = promisify(redisClient.LPUSH).bind(redisClient);
const rpopAsync = promisify(redisClient.RPOP).bind(redisClient);


// Export the Module
module.exports = { lpushAsync, rpopAsync, };
