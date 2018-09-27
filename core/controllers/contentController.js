const contentService = require('../services/contentService');
const config = require('../config/local.json');
const playersHelper = require('../utils/playersHelper');

const renderPage = (req, res) => {
    contentService.getAllPlayers(`${config.contentService.baseUrl}/players`)
        .then(playersData => {
            let players = playersHelper.sortByRating(playersData);
            players = playersHelper.roundRatingToTwo(players);
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

/**
 *
 * @param {*} req
 * @param {*} res
 */
const matchesTool = (req, res) => {

    // const pageData = async () => {
    //     const [players, matches] = await Promise.all([
    //         contentService.getAllPlayers(`${config.contentService.baseUrl}/players`),
    //         contentService.getAllMatches(`${config.contentService.baseUrl}/matches`)
    //     ]);

    //     return {
    //         players,
    //         matches
    //     };
    // };

    res.render('../app/pages/matches', { players: pageData().players, matches: pageData().matches });

};

module.exports = {
    renderPage,
    playersTool,
    playersToolEdit,
    playersToolDelete,
    matchesTool
};
