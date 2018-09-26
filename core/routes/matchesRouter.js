const express = require('express');
const matchesRouter = express.Router();
const Match = require('../models/Match.js');

/**
 * Get all Matches
 */
matchesRouter.get('/', (req, res, next) => {
    Match.find((err, products) => {
        if (err) return next(err);
        res.json(products);
    });
});

/**
 * Get single Match by ID
 */
matchesRouter.get('/:id', (req, res, next) => {
    Match.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

/**
 * Save Match
 */
matchesRouter.post('/', function (req, res, next) {
    Match.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/**
 * Update Match
 */
matchesRouter.put('/:id', function (req, res, next) {
    Match.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/**
 * Delete Match
 */
matchesRouter.delete('/:id', function (req, res, next) {
    Match.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = matchesRouter;
