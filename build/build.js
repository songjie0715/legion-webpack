// https://github.com/shelljs/shelljs
require('shelljs/global');
env.NODE_ENV = 'production';

const _ = require('lodash');
const path = require('path');
const config = require('../config');
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');
const fs = require('fs');
const exec = require('child_process').exec;

const spinner = ora('building for production...');
spinner.start();

const assetsPath = path.join(config.distDir, config.build.assetsSubDirectory);
const buildPath = path.join(config.buildDir, config.build.assetsSubDirectory);
const cssPath = path.join(config.distDir+'/css');

rm('-rf', buildPath);
rm('-rf', assetsPath);
rm('-rf', cssPath);
mkdir('-p', buildPath);

function moveVendor(){
	let result = fs.readdirSync(config.buildDir);
	_.some(result, f=>{
		let stat = fs.statSync(path.join(config.buildDir, f));
		if(stat.isFile() && /^vendor.*\.js$/.test(f)){
			mv(path.join(config.buildDir, f), buildPath);
			return true;
		}
	})
}

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

	console.log('move vendor to  js dir');
	moveVendor();

	exec('npm run release', {cwd: path.join(__dirname, '../')}, function(err){
		if(err) throw err;
	})
});
