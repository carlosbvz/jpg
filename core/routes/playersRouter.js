const express = require('express');
const playersRouter = express.Router();
const Player = require('../models/Player.js');

/**
 * Get all players
 */
playersRouter.get('/', (req, res, next) => {
    Player.find((err, products) => {
        if (err) return next(err);
        res.json(products);
    });
});

/**
 * Get single player by ID
 */
playersRouter.get('/:id', (req, res, next) => {
    Player.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

/**
 * Save Player
 */
playersRouter.post('/', function (req, res, next) {
    Player.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/**
 * Update Player
 */
playersRouter.put('/:id', function (req, res, next) {
    Player.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/**
 * Delete Player
 */
playersRouter.delete('/:id', function (req, res, next) {
    Player.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = playersRouter;
