
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');

var browserConfig = {
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:3012"
        }
    },
    entry: ['babel-polyfill', __dirname + '/src/index.js'],
    output: {
        path: path.resolve(__dirname + '/public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'env', 'stage-0']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
        })
    ]
}

var serverConfig = {
    target: 'node',
    externals: [nodeExternals()],
    entry: __dirname + '/server/main.js',
    output: {
        path: path.resolve(__dirname + '/public'),
        filename: 'server.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'env', 'stage-0']
                    }
                }
            }
        ]
    }
}

module.exports = [browserConfig, serverConfig]