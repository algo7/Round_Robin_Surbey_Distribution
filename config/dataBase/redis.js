// Dependencies
const redis = require('redis');


// Winston Logger
const appLog = require('../system/logs').get('appLog');

// Connect to Redis
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: 6379,
})
    .once('connect', () => appLog.info('Redis Connected'))
    .on('error', err => appLog.error('Redis Connection Error: ' + err));



// Promisify redis query
const { promisify, } = require('util');
const lpushAsync = promisify(redisClient.LPUSH).bind(redisClient);
const rpopAsync = promisify(redisClient.RPOP).bind(redisClient);
const llenAsync = promisify(redisClient.LLEN).bind(redisClient);
const setAsync = promisify(redisClient.SET).bind(redisClient);
const incrbyAsync = promisify(redisClient.INCRBY).bind(redisClient);

// Export the Module
module.exports = { lpushAsync, rpopAsync, llenAsync, setAsync, incrbyAsync, };
