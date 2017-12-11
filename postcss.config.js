const path = require('path');
const { NodeJsInputFileSystem, CachedInputFileSystem, ResolverFactory } = require('enhanced-resolve');

// create a resolver
const fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), 4000).fileSystem;
const resolver = ResolverFactory.createResolver({
  alias: {
    '~': path.resolve(__dirname),
  },
  extensions: ['.css'],
  modules: ['node_modules'],
  useSyncFileSystemCalls: true,
  fileSystem,
});

const isDev = process.env['NODE_ENV'] !== 'production';

module.exports = ctx => ({
  map: isDev,
  plugins: [
    require('postcss-import')({
      resolve(id, basedir) {
        return resolver.resolveSync({}, basedir, id);
      },
      root: ctx.cwd,
    }),
    require('postcss-cssnext')({
      features: {
        browsers: ['last 2 versions', 'safari >= 9'],
      },
    }),
    isDev && require('csswring')(),
  ],
});
