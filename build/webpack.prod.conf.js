var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const result = merge({}, baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true})
    },
    devtool: false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('[name].js'),
        chunkFilename: utils.assetsPath('[id].js')
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('[name].[contenthash].css')),
    ]
});

module.exports = result;
