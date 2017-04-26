const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const _ = require('lodash');

_.forEach(baseWebpackConfig.entry, (list, name)=>{
    if(typeof list == 'string'){
        baseWebpackConfig.entry[name] = [baseWebpackConfig.entry[name], `webpack-hot-middleware/client`]
    } else {
        baseWebpackConfig.entry[name] = baseWebpackConfig.entry[name].concat([`webpack-hot-middleware/client`])
    }
});

module.exports = merge.smart(baseWebpackConfig, {
	output: {
		publicPath: config.dev.publicPath
	},
	devtool: '#eval-source-map',
	// eval-source-map is faster for development
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
});
