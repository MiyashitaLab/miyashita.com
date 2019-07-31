import libpath from 'path';
import pkgDir from 'pkg-dir';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

const rootDir = pkgDir.sync(__dirname);
const srcDir = libpath.resolve(rootDir, './src');

/** @param {import('webpack').Configuration} config */
const webpackOverride = (config, { stage, defaultLoaders }) => {
  const isProd = stage === 'prod';

  const cssLoaders = [
    {
      test: /\.css$/,
      exclude: [/node_modules/],
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
      test: /\.css$/,
      include: [/node_modules/],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false,
            camelCase: false,
            importLoaders: 1,
          },
        },
        'postcss-loader',
      ],
    },
  ];

  const fileLoader = {
    loader: 'file-loader',
    exclude: [/\.js$/, /\.html$/, /\.json$/, /\.ejs$/],
    options: {
      name: 'assets/[name].[hash:8].[ext]',
    },
  };

  const pluginsForProduction = [
    new LodashModuleReplacementPlugin(),
    new GenerateSW({
      cacheId: 'miyashita.com',
      directoryIndex: '/',
      runtimeCaching: [
        {
          urlPattern: new RegExp('/staticData/.*'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'miyashita-com_static-data',
            expiration: {
              maxAgeSeconds: 60,
            },
          },
        },
        {
          urlPattern: new RegExp('/.*'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'miyashita-com_site-data',
            expiration: {
              maxAgeSeconds: 60,
            },
          },
        },
        {
          urlPattern: new RegExp('https://.*\\.googleusercontent\\.com/.*'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'miyashita-com_google-photos',
            expiration: {
              maxAgeSeconds: 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: new RegExp('https://.*\\.youtube\\.com/.*'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'miyashita-com_youtube-thumbnails',
            expiration: {
              maxAgeSeconds: 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: new RegExp('https://research\\.miyashita\\.com/.*/thumb.jpg'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'miyashita-com_research-thumbnails',
            expiration: {
              maxAgeSeconds: 24 * 60 * 60,
            },
          },
        },
      ],
    }),
  ];

  Object.assign(config, {
    resolve: {
      ...config.resolve,
      alias: {
        '~': srcDir,
      },
    },
    module: {
      ...config.module,
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|jsx|mjs)$/,
              use: [
                {
                  loader: 'babel-loader',
                },
              ],
            },
            ...cssLoaders,
            fileLoader,
            defaultLoaders.fileLoader,
          ],
        },
      ],
    },
    devtool: 'cheap-module-source-map',
    plugins: [...config.plugins, ...(isProd ? pluginsForProduction : [])],
  });

  return config;
};

export default webpackOverride;
