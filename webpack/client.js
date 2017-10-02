const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const isProduction = process.env['NODE_ENV'] === 'production';

const config = {
  target: 'web',
  devtool: isProduction ? 'nosources-source-map' : 'source-map',
  entry: {
    client: ['core-js/shim', ...(!isProduction ? ['react-hot-loader/patch'] : []), './src/client.jsx'],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
    filename: 'scripts/[name].js',
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    ...(isProduction ? [new MinifyPlugin()] : [new webpack.HotModuleReplacementPlugin()]),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: !isProduction,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env['NODE_ENV']),
      },
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: ['last 2 versions', 'safari >= 7'],
                  },
                  modules: false,
                  exclude: ['transform-regenerator'],
                },
              ],
            ],
            plugins: [['syntax-dynamic-import'], ['transform-react-jsx']],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /global\.css/],
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              camelCase: true,
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: !isProduction },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [/node_modules/, /global\.css/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: !isProduction },
            },
          ],
          publicPath: '/styles/',
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|otf|eot|ttf|woff|woff2)(\?.+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[sha512:hash:hex:8].[ext]',
              publicPath: '/',
              outputPath: 'assets/',
              useRelativePath: false,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
    ],
  },
};

if (!isProduction) {
  config.devServer = {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../build'),
    hot: true,
    port: 3000,
    publicPath: '/',
    proxy: {
      '/': 'http://localhost:8000',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}

module.exports = config;
