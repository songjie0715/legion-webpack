// see http://vuejs-templates.github.io/webpack for documentation.

'use strict';
let path = require('path');
let fs = require('fs');
let _ = require('lodash');

/**
 * multiple entry
 */
// const entryDir = './src/js/controllers';
//
// const controller = {
// 	bi: [],
// 	manage: []
// };
//
// const entryCategory = {};
// const entry = {
// };
//
// _.forEach(controller, function (files, dir) {
// 	files = fs.readdirSync(path.join(entryDir, dir));
// 	_.forEach(files, function (f) {
// 		let key = dir + '/' + path.basename(f, '.js');
// 		if( !(dir in entryCategory) ){
// 			entryCategory[dir] = [];
// 		}
// 		entryCategory[dir].push(key);
// 		entry[key] = entryDir + '/' + dir + '/' + f;
// 	})
// });

const devPort = 9191;
const productPort = 9192;

module.exports = {
	entry: {
		client: './src/js/controllers/client.js'
	},
	build: {
		assetsRoot: path.resolve(__dirname, 'dist'),
		assetsSubDirectory: 'js/',
		assetsPublicPath: 'http://localhost:'+devPort+'/dist/js/',
		productionSourceMap: false
	},
	dev: {
		port: devPort,
		proxyTable: {}
	},
	product: {
		port: productPort
	}
};
