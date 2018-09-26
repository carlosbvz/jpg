const fetchHelper = require('../utils/fetchHelper');

/**
 * Get a list of all players
 */
const getAllPlayers = (requestUrl) => {
    return fetchHelper.fetch(requestUrl)
        .then(response => {
            return response;
        });
};

/**
 * Get a player
 */
const getPlayer = (requestUrl) => {
    return fetchHelper.fetch(requestUrl)
        .then(response => {
            return response;
        });
};

/**
 * Get a list of matches
 */
const getAllMatches = (requestUrl) => {
    return fetchHelper.fetch(requestUrl)
        .then(response => {
            return response;
        });
};

module.exports = {
    getAllPlayers,
    getPlayer,
    getAllMatches
};
