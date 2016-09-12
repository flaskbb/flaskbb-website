var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'app': './js/main.js',
        'styles': './scss/main.scss'
    },
    output: {
        path: path.dirname(__dirname) + '/assets/static',
        filename: '[name].js'
    },
    devtool: '#cheap-module-source-map',
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                //loader: 'file'
                loader: 'url?limit=100000&name=[name].[ext]'
            }
            ]
        },
        plugins: [
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
        ]
    };
