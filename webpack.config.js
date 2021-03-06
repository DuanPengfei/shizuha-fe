/*
 * @Author: fei
 * @Date: 2018-01-14 00:20:43
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-09 10:52:43
 */

/**
 * builtin module
 */
const path = require('path');

/**
 * third part module
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|svg|jpg|jpeg|gif)$/, use: [ 'file-loader' ] }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            title: 'shizuka'
        }),
        // new UglifyJsPlugin()
    ]
};
