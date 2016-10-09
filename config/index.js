// see http://vuejs-templates.github.io/webpack for documentation.

'use strict';
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const devPort = 9191;
const productPort = 9192;

module.exports = {
    srcDir: './src',
    distDir: './dist',
    buildDir: './src/build',
	entry: {
		template: './src/js/project/template/main.js',
        vendor: ['vue', 'vuex', 'vue-router', 'es6-promise']
	},
	build: {
		assetsRoot: path.resolve(__dirname, '../src/build'),
		assetsSubDirectory: 'js/',
		assetsPublicPath: `http://localhost:${devPort}/dist/js/`,
		productionSourceMap: false
	},
	dev: {
		port: devPort,
		proxyTable: {}
	},
	product: {
		port: productPort
	},
	manifest: 'rev-manifest.json',
	jspManifestProd: 'D:/IdeaProjects/wifipix-bi-web/src/main/webapp/WEB-INF/views/common/inc/_manifest_prod.jsp',
	jspManifestDev: 'D:/IdeaProjects/wifipix-bi-web/src/main/webapp/WEB-INF/views/common/inc/_manifest_dev.jsp'
};
