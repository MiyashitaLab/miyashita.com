import libpath from 'path';
import pkgDir from 'pkg-dir';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

const rootDir = pkgDir.sync(__dirname);
const srcDir = libpath.resolve(rootDir, './src');

const webpackConfigs = [
  (config, args) => {
    const { stage, defaultLoaders: { jsLoader } } = args;
    const isDev = stage === 'dev';
    const isProd = stage === 'prod';
    const isNode = stage === 'node';

    const cssLoader = {
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
    };

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
            handler: 'cacheFirst',
            options: {
              cacheName: 'miyashita-com_static-data',
              expiration: {
                maxAgeSeconds: 60,
              },
            },
          },
          {
            urlPattern: new RegExp('/.*'),
            handler: 'networkFirst',
            options: {
              cacheName: 'miyashita-com_site-data',
              expiration: {
                maxAgeSeconds: 60,
              },
            },
          },
          {
            urlPattern: new RegExp('https://.*\\.googleusercontent\\.com/.*'),
            handler: 'cacheFirst',
            options: {
              cacheName: 'miyashita-com_google-photos',
              expiration: {
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: new RegExp('https://.*\\.youtube\\.com/.*'),
            handler: 'cacheFirst',
            options: {
              cacheName: 'miyashita-com_youtube-thumbnails',
              expiration: {
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: new RegExp('https://research\\.miyashita\\.com/.*/thumb.jpg'),
            handler: 'cacheFirst',
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
            oneOf: [jsLoader, cssLoader, fileLoader],
          },
        ],
      },
      plugins: [...config.plugins, ...(isProd ? pluginsForProduction : [])],
    });

    return config;
  },
];
export default webpackConfigs;
