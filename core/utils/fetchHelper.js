const nodeFetch = require('node-fetch');

/**
 *
 * @param {*} requestUrl
 * @param {*} settings
 */
const fetch = (requestUrl, settings = {}) => {
    return nodeFetch(requestUrl, settings)
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    fetch
};
