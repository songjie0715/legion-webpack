// see http://vuejs-templates.github.io/webpack for documentation.

'use strict';
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const os = require('os');

const devPort = 9391;
const platform = os.platform();
const manifestBasePath = (platform == 'win32')? 'C:/Users/jabbar/IdeaProjects/': '/Users/jabbar/IdeaProjects/';
const manifestProjectPath = 'wifipix-wificloud2.0/src/main/webapp/WEB-INF/views/common/inc/';

module.exports = {
    srcDir: './src',
    distDir: './dist',
    buildDir: './src/build',
	entry: {
		template: './src/js/project/template/main.js',
        vendor: ['./src/js/main.js', 'vue', 'vuex', 'vue-router', 'es6-promise', 'moment', 'jquery']
	},
	commonChunks: [{
		name: 'vendor',
		minChunks: 2,
		chunks: ['vendor', 'template']
	}, {
        minChunks: Infinity,
        names: ['vendor', 'manifest']
    }],
    build: {
        assetsRoot: path.resolve(__dirname, '../src/build'),
        assetsSubDirectory: 'js/',
        productionSourceMap: false
    },
    dev: {
        port: devPort,
        publicPath: `http://localhost:${devPort}/dist/js/`,
        proxyTable: {}
    },
	manifest: 'rev-manifest.json',
    jspManifestProd: `${manifestBasePath}${manifestProjectPath}_manifest_prod.jsp`,
    jspManifestDev: `${manifestBasePath}${manifestProjectPath}_manifest_dev.jsp`
};
