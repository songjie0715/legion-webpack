const config = require('../config');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge.smart(baseWebpackConfig, {
	devtool: false,
	output: {
		path: config.build.assetsRoot,
        filename: utils.assetsPath('[chunkhash:8].[name].js'),
        chunkFilename: utils.assetsPath('[chunkhash:8].[id].js')
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
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
	]
});