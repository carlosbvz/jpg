const express = require('express');
const contentRouter = express.Router();
const contentController = require('../controllers/contentController');

contentRouter.get('/player/delete', (req, res) => {
    res.render('../app/pages/playerDelete', {});
});

contentRouter.get('/playersTool/add', (req, res) => {
    res.render('../app/pages/playerAdd', {});
});

contentRouter.use('/playersTool/delete/:id', contentController.playersToolDelete);
contentRouter.use('/playersTool/edit/:id', contentController.playersToolEdit);
contentRouter.use('/playersTool', contentController.playersTool);
contentRouter.use('/*', contentController.renderPage);

module.exports = contentRouter;
