const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env['NODE_ENV'] === 'production';

const config = {
  target: 'node',
  devtool: isProduction ? 'nosources-source-map' : 'source-map',
  watch: !isProduction,
  entry: {
    server: ['./src/server.jsx'],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../script'),
    filename: '[name].js',
    library: 'server',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: [nodeExternals()],
  plugins: [
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
            plugins: [['dynamic-import-node'], ['transform-react-jsx']],
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
        use: [
          'style-loader/locals',
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
              emitFile: false,
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

module.exports = config;
