const express = require('express');
const contentRouter = express.Router();

contentRouter.get('/*', (req, res) => {
    res.render('../app/pages/home', {});
});

module.exports = contentRouter;
