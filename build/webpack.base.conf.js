var path = require('path');
var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var projectRoot = path.resolve(__dirname, '../');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
	entry: config.entry,
	output: {
		path: config.build.assetsRoot,
		publicPath: config.build.assetsPublicPath,
		filename: '[name].js'
	},
	resolve: {
		modulesDirectories: ["node_modules", "dist/vendor"],
		extensions: ['', '.js', '.vue'],
		fallback: [path.join(__dirname, '../node_modules')],
		alias: {
			'src': path.resolve(__dirname, '../src/js'),
			'assets': path.resolve(__dirname, '../src/assets'),
			//'vendor': path.resolve(__dirname, '../dist/vendor/'),
			'components': path.resolve(__dirname, '../src/components'),
			root: [path.join(__dirname, "../dist/vendor")]
		}
	},
	resolveLoader: {
		fallback: [path.join(__dirname, '../node_modules'), path.join(__dirname, '../dist/vendor')]
	},
	module: {
		noParse: [/handlebars/],
		preLoaders: [
			// {
			//   test: /\.vue$/,
			//   loader: 'eslint',
			//   include: projectRoot,
			//   exclude: /node_modules/
			// },
			// {
			//   test: /\.js$/,
			//   loader: 'eslint',
			//   include: projectRoot,
			//   exclude: /node_modules/
			// }
		],
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			}, {
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}, {
				test: /\.scss$/,
				loader: 'scss-loader'
			}, {
				test: /jquery/,
				loader: "expose?$!expose?jQuery"
			}, {
				test: /\.js$/,
				loader: 'babel',
				include: projectRoot,
				exclude: /node_modules|bower_components|vendor/
			}, {
				test: /\.json$/,
				loader: 'json'
			}, {
				test: /\.html$/,
				loader: 'vue-html'
			}, {
				test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: utils.assetsPath('[name].[hash:7].[ext]')
				}
			}
		]
	},
	eslint: {
		//formatter: require('eslint-friendly-formatter')
	},
	vue: {
		loaders: utils.cssLoaders()
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
			"window.jQuery": 'jquery'
		}),
		new webpack.ResolverPlugin(
			new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
		),
		// new CommonsChunkPlugin({
		// 	name: "vendor",
		// 	filename: "vendor.js",
		// 	minChunks: Infinity
		// }),
		new CommonsChunkPlugin({
			name: "common",
			filename: "common.js",
			minChunks: 2
		})
	]
};
