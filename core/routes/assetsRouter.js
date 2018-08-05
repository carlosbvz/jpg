const express = require('express');
const assetsPath = 'public/assets';
const assetsRouter = express.Router();

assetsRouter
    .use(express.static(assetsPath))
    .use((req, res) => {
        // Make sure that requests for missing assets do not fall through to other route handlers
        res.sendStatus(404);
    });

module.exports = assetsRouter;
