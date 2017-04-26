const path = require('path');
const utils = require('./utils');
const config = require('../config');
const webpack = require('webpack');

module.exports = {
	entry: config.entry,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js'
	},
	resolve: {
		modules: ["node_modules"],
        alias: {
		    'helper.js': 'helper.js/build/helper.js'
        }
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loaders: [
					'babel-loader',
				],
				exclude: /node_modules/
			},
			{
				test: /\.(scss|css)$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
    performance: { hints: false },
	plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: 'tether',
            Highcharts: 'highcharts/highstock',
            echarts: 'echarts'
        }),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
		...config.commonChunks.map(d=>{
			return new webpack.optimize.CommonsChunkPlugin(d);
		})
	]
};