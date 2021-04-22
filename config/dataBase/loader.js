// Redis
const { lpushAsync, llenAsync, setAsync, } = require('./redis');

// The links dataset
const { links, } = require('./links.json');

/**
 * Load the link ids into redis if there is none
 * @returns {Undefined}
 */
const redisLoader = async () => {

    // Get the length of the links list in redis
    const linkArrayLength = await llenAsync('links');

    // If the length is 0
    if (linkArrayLength === 0) {

        // Iterate over the link dataset
        links.map(async link => {

            // push the ids into the database
            await lpushAsync('links', link._id);

            // Set the initial click count
            await setAsync(link.name, 0);

        });
    }
};

module.exports = redisLoader;
