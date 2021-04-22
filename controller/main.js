// Redis
const { lpushAsync, rpopAsync, incrbyAsync, getAsync, } = require('../config/dataBase/redis');

// Async Handler
const asyncHandler = require('../config/middleware/asyncHandler');

// The links dataset
const { links, } = require('../config/dataBase/links.json');


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
    const { url, name, } = links[linkPosition];

    await incrbyAsync(name, 1);

    // Redirect the client to the respective links
    res.status(200).redirect(url);
});


// @desc Get the survey link status
// @route GET /info
// @access Public
const info = asyncHandler(async (req, res, next) => {

    // Get the stats of each link
    const stats = await Promise.all(
        // Loop through the dataset
        links.map(async link => {
            // The stat object
            return {
                link_name: link.name,
                link_id: link.id,
                hits: await getAsync(link.name),
            };
        })
    );

    // Return the result to the front end
    res.status(200).json(stats);
});


module.exports = { main, info, };