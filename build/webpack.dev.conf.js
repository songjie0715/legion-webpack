const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.conf');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client'].concat(baseWebpackConfig.entry[name])
});

module.exports = merge({}, baseWebpackConfig, {
    devtool: '#eval-source-map',
    // eval-source-map is faster for development
    plugins: [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
});
