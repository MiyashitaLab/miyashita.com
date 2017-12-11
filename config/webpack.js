const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const isDev = process.env['NODE_ENV'] !== 'production';

const extend = config => {
  config.node = {
    fs: 'empty',
  };

  const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader');
  Object.assign(vueLoader.options, {
    cssModules: {
      camelCase: true,
    },
  });

  return config;
};

const plugins = [];

if (!isDev) {
  // Analytics
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, '../analytics/report.html'),
      defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: path.resolve(__dirname, '../analytics/stats.json'),
      statsOptions: null,
      logLevel: 'info',
    })
  );
  plugins.push(new LodashModuleReplacementPlugin());
}

module.exports = {
  extend,
  plugins,
};
