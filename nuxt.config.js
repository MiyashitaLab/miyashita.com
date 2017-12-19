const webpack = require('./config/webpack');
const routes = require('./routes.config');
const isDev = process.env['NODE_ENV'] !== 'production';

module.exports = {
  dev: isDev,
  head: {
    htmlAttrs: {
      lang: 'ja',
      dir: 'ltr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
      },
    ],
  },
  env: {
    baseUrl: isDev ? 'http://localhost:3000' : 'https://miyashita.com',
    siteTitle: '宮下研究室 - 明治大学 総合数理学部 先端メディアサイエンス学科',
    twitterAccount: '@Miyashita_Lab',
  },
  build: {
    vendor: ['intersection-observer', '~/utils/fetchData', '~/utils/generateHead', '~/utils/imageUrl'],
    extend: webpack.extend,
    plugins: webpack.plugins,
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type);
      },
      shouldPrefetch: (file, type) => {
        return ['script', 'style', 'font'].includes(type);
      },
    },
  },
  generate: {
    routes,
    minify: {
      collapseWhitespace: false,
    },
  },
  modules: ['@nuxtjs/router', '@nuxtjs/workbox', '@nuxtjs/google-analytics'],
  'google-analytics': {
    id: 'UA-25034793-2',
  },
  workbox: {
    dev: isDev, // Enable PWA when developing
    runtimeCaching: [
      {
        urlPattern: '/_data/.*',
        handler: 'cacheFirst',
        method: 'GET',
        options: {
          cacheExpiration: {
            maxAgeSeconds: 60,
          },
        },
      },
      {
        urlPattern: 'https://.*\\.googleusercontent\\.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        options: {
          cacheExpiration: {
            maxAgeSeconds: 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: 'https://.*\\.youtube\\.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        options: {
          cacheExpiration: {
            maxAgeSeconds: 24 * 60 * 60,
          },
        },
      },
    ],
  },
  plugins: ['~/plugins/index.js', { src: '~/plugins/client.js', ssr: false }],
};
