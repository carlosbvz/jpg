const contentService = require('../services/contentService');
const config = require('../config/local.json');

const renderPage = (req, res) => {
    contentService.getAllPlayers(`${config.contentService.baseUrl}/players`)
        .then(players => {
            res.render('../app/pages/home', { players });
        });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const playersTool = (req, res) => {
    contentService.getAllPlayers(`${config.contentService.baseUrl}/players`)
        .then(players => {
            res.render('../app/pages/players', { players });
        });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const playersToolEdit = (req, res) => {
    contentService.getPlayer(`${config.contentService.baseUrl}/players/${req.params.id}`)
        .then(player => {
            res.render('../app/pages/playerEdit', { player });
        });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const playersToolDelete = (req, res) => {
    contentService.getPlayer(`${config.contentService.baseUrl}/players/${req.params.id}`)
        .then(player => {
            res.render('../app/pages/playerDelete', { player });
        });
};

module.exports = {
    renderPage,
    playersTool,
    playersToolEdit,
    playersToolDelete
};
