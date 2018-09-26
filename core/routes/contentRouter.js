const express = require('express');
const contentRouter = express.Router();
const contentController = require('../controllers/contentController');

// Players
contentRouter.get('/player/delete', (req, res) => {
    res.render('../app/pages/playerDelete', {});
});

contentRouter.get('/playersTool/add', (req, res) => {
    res.render('../app/pages/playerAdd', {});
});

contentRouter.use('/playersTool/delete/:id', contentController.playersToolDelete);
contentRouter.use('/playersTool/edit/:id', contentController.playersToolEdit);
contentRouter.use('/playersTool', contentController.playersTool);

// Matches
contentRouter.get('/match/delete', (req, res) => {
    res.render('../app/pages/matchDelete', {});
});

contentRouter.get('/matchesTool/add', (req, res) => {
    res.render('../app/pages/matchAdd', {});
});

contentRouter.use('/matchesTool/delete/:id', contentController.playersToolDelete);
contentRouter.use('/matchesTool/edit/:id', contentController.playersToolEdit);
contentRouter.use('/matchesTool', contentController.matchesTool);

contentRouter.use('/*', contentController.renderPage);

module.exports = contentRouter;
