process.env.VUE_ENV = 'server';
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const express = require('express');
const app = express();
const webpackConfig = require('./webpack.dev.conf');
const config = require('../config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const clientCompiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(clientCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}));

app.use(require('webpack-hot-middleware')(clientCompiler));

app.use('/dist', express.static(resolve('../dist')));

const port = process.env.PORT || config.dev.port;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
});
