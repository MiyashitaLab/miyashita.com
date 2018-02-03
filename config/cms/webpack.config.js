const libpath = require('path');
const pkgDir = require('pkg-dir');
const ejs = require('ejs');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = pkgDir.sync(__dirname);
const srcDir = libpath.resolve(rootDir, './src');
const exportDir = libpath.resolve(rootDir, './public/admin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: libpath.resolve(srcDir, './cms/index.jsx'),
  output: {
    path: exportDir,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: { '~': srcDir },
  },
  externals: {
    'netlify-cms': 'CMS',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        loader: 'file-loader',
        exclude: [/\.jsx?$/, /\.html$/, /\.json$/, /\.ejs$/, /\.css$/],
        options: {
          name: 'assets/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: libpath.resolve(srcDir, './cms/index.ejs'),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: libpath.resolve(srcDir, './cms/config.yml'),
        to: libpath.resolve(exportDir, './config.yml'),
        transform(content) {
          return ejs.render(Buffer.from(content).toString('utf8'), { process });
        },
      },
    ]),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    ...(isProd ? [new UglifyJsPlugin()] : []),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: libpath.resolve(rootDir, './public'),
    publicPath: '/admin/',
    stats: 'errors-only',
    port: 3000,
  },
};
