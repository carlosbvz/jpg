'use strict';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackconfig = require('./webpack.config.js');

var useWebpackMiddleware = (app) => {
    const webpackcompiler = webpack(webpackconfig);

    // Dev server (watch)
    app.use(webpackDevMiddleware(webpackcompiler, {
        publicPath: webpackconfig.output.publicPath,
        mode: 'development',
        stats: {
            colors: true,
            chunks: false,
            'errors-only': true
        },
        headers: { 'Access-Control-Allow-Origin': '*' }
    }));

    // Hot reload
    app.use(webpackHotMiddleware(webpackcompiler, {
        log: console.log
    }));

    return app;
};

module.exports = {
    useWebpackMiddleware
};
