const path = require('path');
const isProduction = process.env['NODE_ENV'] === 'production';

module.exports = {
  plugins: {
    'postcss-import': {
      path: [path.resolve(__dirname, 'src')],
    },
    'postcss-cssnext': {
      features: {
        browsers: ['last 2 versions', 'safari >= 7'],
      },
    },
  },
};

if (isProduction) {
  Object.assign(module.exports.plugins, {
    csswring: { map: false },
  });
}
