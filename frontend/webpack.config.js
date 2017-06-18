const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

let plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
];

switch (NODE_ENV) {
  case 'production':
    plugins = plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          dead_code: true,
          drop_console: true,
          screw_ie8: true,
        },
      }),
    ]);
    break;
  case 'development':
    plugins = plugins.concat([
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
    ]);
    break;
  default:
    throw new Error('Unsupported env ' + NODE_ENV);
}

module.exports = {

  devtool: NODE_ENV === 'production' ? null : 'source-map',

  context: path.join(__dirname, 'src'),

  entry: ['./index'],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  plugins,

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(png|jpg|gif|html|svg)$/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
    ],
  },
};
