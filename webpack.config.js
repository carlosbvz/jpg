const webpack = require('webpack');

/**
    Webpack Development mode configuration
*/
const config = {

    entry: {
        main: [
            'webpack-hot-middleware/client?reload=true',
            './app/index'
        ]
    },

    output: {
        path: '/',
        filename: '[name].js',
        publicPath: 'http://localhost:3000/assets/scripts'
    },

    devtool: '#eval',

    module: {
        rules: [{
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
        }, {
            test: /.*\.(gif|png|jpe?g|svg|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
            use: 'url-loader'
        }],
        exprContextCritical: false
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],

    resolve: {
        extensions: ['.js'],
        modules: ['./app', 'node_modules']
    },

    performance: { hints: false }
};

if (module.hot) {
    module.hot.accept();
}

module.exports = config;
