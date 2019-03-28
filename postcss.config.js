const libpath = require('path');
const ResolverFactory = require('enhanced-resolve/lib/ResolverFactory');
const NodeJsInputFileSystem = require('enhanced-resolve/lib/NodeJsInputFileSystem');
const CachedInputFileSystem = require('enhanced-resolve/lib/CachedInputFileSystem');

const isProduction = process.env['NODE_ENV'] === 'production';

const resolver = ResolverFactory.createResolver({
  alias: {
    '~': libpath.resolve(__dirname, 'src'),
  },
  extensions: ['.css'],
  modules: ['node_modules'],
  useSyncFileSystemCalls: true,
  fileSystem: new CachedInputFileSystem(new NodeJsInputFileSystem(), 60000),
});

module.exports = {
  plugins: {
    'postcss-import': {
      path: [libpath.resolve(__dirname, 'src')],
      resolve(id, basedir) {
        return resolver.resolveSync({}, basedir, id);
      },
    },
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'color-mod-function': { unresolved: 'warn' },
      },
    },
    'postcss-flexbugs-fixes': {},
  },
};

if (isProduction) {
  Object.assign(module.exports.plugins, {
    csswring: { map: false },
  });
}
