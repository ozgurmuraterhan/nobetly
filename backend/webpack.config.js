const webpack = require('webpack');

module.exports = {
  target: 'node',
  node: {
    fs: 'empty',
  },
  entry: './server.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle_server.js',
  },
};
