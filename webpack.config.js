const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',  
  entry: './src/App.js',
  output: {
    path:path.resolve(__dirname,"dist"),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
 },
};