const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require('webpack-notifier');
const WatchLiveReloadPlugin = require('webpack-livereload-plugin');

const url = 'shaque.docksal';

module.exports = function(env) {
  if (!env.NODE_ENV) {
    env.NODE_ENV = 'dev';
  }
  env.hostname = 'localhost';

  let plugins = [
    new ExtractTextPlugin({filename: 'css/styles.css', disable: false, allChunks: true}),
    new WebpackNotifierPlugin({title: 'Theme build', alwaysNotify: true})
  ];

  let rules = {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: "file-loader",
        options: {
          name: "imgs/[name]-[hash].[ext]",
          limit: 100000,
          publicPath: '../'
        }
      }, {
        test: /\.woff?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          mimetype: "application/font-woff",
          limit: 100000,
          name: 'fonts/[name]-[hash].[ext]'
        }
      }, {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          mimetype: "application/font-woff",
          limit: 100000
        }
      }, {
        test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          mimetype: "application/font-ttf",
          limit: 100000
        }
      }, {
        test: /\.(eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          mimetype: "application/font-eot",
          limit: 100000
        }
      }, {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          mimetype: "application/image/svg+xml",
          limit: 100000,
          name: "imgs/[name]-[hash].[ext]"
        }
      }, {
        test: /\.js/,
        loader: 'import-glob'
      }
    ]
  }

  let config = {
    module: rules,
    entry:  [
      path.resolve(__dirname, 'js/index.js'),
    ],
    output: {
      path: path.resolve(__dirname, 'vendor'),
      filename: 'js/scripts.js',
    },
    plugins: plugins,
    watchOptions: {
      poll: true
    }
  }
  if ((env.NODE_ENV === 'dev')) {
    config.devtool = 'inline-source-map';
  }
  return config;
}