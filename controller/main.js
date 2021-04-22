// Redis
const { lpushAsync, rpopAsync, llenAsync, setAsync, } = require('../config/dataBase/redis');

// Async Handler
const asyncHandler = require('../config/middleware/asyncHandler');

// The links dataset
const { links, } = require('../config/dataBase/links.json');

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
            await setAsync(link.name, 1);

        });
    }
};

// Call the redis loader function
redisLoader();

// @desc Get the survey link
// @route GET /
// @access Public
const main = asyncHandler(async (req, res, next) => {

    // Get the link id by poping the list from the right
    const linkId = await rpopAsync('links');

    // Push the link id back to the list
    await lpushAsync('links', linkId);

    // Get the position of the link in the dataset
    const linkPosition = linkId - 1;

    // Get the actual link
    const linkToSend = links[linkPosition].url;

    // Redirect the client to the respective links
    res.status(200).redirect(linkToSend);
});


module.exports = { main, };