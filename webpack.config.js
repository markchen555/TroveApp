const path = require('path');
const webpack = require('webpack')

const webpackConfig = {
  entry: path.resolve(__dirname, './client/src/index.js'),
  output: {
    path: path.resolve(__dirname, './client/static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
};

webpackConfig.module.loaders.push({
  test: /\.js[x]?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: { presets: ['env', 'react']},
});

webpackConfig.module.loaders.push({
  test: /\.(css)$/,
  loaders: ['style-loader', 'css-loader?url=false']
});

webpackConfig.module.loaders.push({
  test: /\.(png|jpg|gif|jpeg)$/,
  loader: 'file-loader',
  options: {}  
});

module.exports = webpackConfig;
