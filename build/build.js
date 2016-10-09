// https://github.com/shelljs/shelljs
require('shelljs/global');
env.NODE_ENV = 'production';

const path = require('path');
const config = require('../config');
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');
const exec = require('child_process').exec;

const spinner = ora('building for production...');
spinner.start();

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
const buildPath = path.join(config.buildDir, config.build.assetsSubDirectory);

rm('-rf', buildPath);
// rm('-rf', assetsPath);
mkdir('-p', assetsPath);

webpack(webpackConfig, function (err, stats) {
	spinner.stop();
	if (err) throw err;
	process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n');
	mv(path.join(config.build.assetsRoot, 'vendor-bundle.js'), assetsPath);

    exec('npm run-script rev', {cwd: path.join(__dirname, '../')}, function(err){
		if(err) throw err;
		exec('npm run-script rev', {cwd: path.join(__dirname, '../')}, function (err) {
			if(err) throw err;
		});
    })
});
