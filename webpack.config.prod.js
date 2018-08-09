'use strict';

const path = require('path');
const shortId = require('short-id');
const webpack = require('webpack');
const VersionFile = require('webpack-version-file');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
    Webpack Production build configuration
*/
const config = {

    entry: {
        main: './app/index.js'
    },

    output: {
        path: path.join(__dirname, '/public/assets/scripts'),
        filename: '[name].js'
    },

    devtool: false,

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'raw-loader'
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            }, {
                test: /.*\.(gif|png|jpe?g|svg)(\?[a-z0-9=.]+)?$/,
                use: 'file-loader?name=../images/[name].[ext]'
            }, {
                test: /.*\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
                use: 'file-loader?name=../fonts/[name].[ext]'
            }],
        exprContextCritical: false
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new ExtractTextPlugin('../styles/[name].css'),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false },
        //     output: { comments: false }
        // }),
        new CopyWebpackPlugin([{
            context: './app/assets/images',
            from: '**/*',
            to: '../images/'
        }, {
            context: './app/assets/scripts/vendor',
            from: '*',
            to: '../scripts/vendor/'
        }, {
            context: './app/assets/fonts/*',
            from: '*',
            to: '../fonts/'
        }]),
        new VersionFile({
            output: path.join(__dirname, 'buildId'),
            templateString: '<%= buildId %>',
            data: {
                buildId: shortId.generate()
            }
        })
    ],

    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },

    performance: { hints: false }
};

module.exports = config;
