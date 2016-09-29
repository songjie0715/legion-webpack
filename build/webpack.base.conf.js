const path = require('path');
const utils = require('./utils');
const config = require('../config');
const webpack = require('webpack');

module.exports = {
    entry: config.entry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js'
    },
    resolveLoader: {
        root: path.join(__dirname, '../node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                loader: 'scss-loader'
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    vue: {
        loaders: utils.cssLoaders()
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-bundle.js'
        }),
        new webpack.IgnorePlugin(/vertx/)
    ]
};