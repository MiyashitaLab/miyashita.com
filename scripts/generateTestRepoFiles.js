const libpath = require('path');
const fs = require('fs');
const glob = require('glob');
const pkgDir = require('pkg-dir');

const rootDir = pkgDir.sync(__dirname);
const repoFiles = {};

glob(libpath.join(rootDir, './articles/**/*.md'), (err, files) => {
  files.forEach(file => {
    const filePath = libpath
      .relative(rootDir, file)
      .split(libpath.sep)
      .join(libpath.posix.sep);
    const dirName = libpath.dirname(filePath);
    const fileName = libpath.basename(filePath);

    repoFiles[dirName] = repoFiles[dirName] || {};
    repoFiles[dirName][fileName] = { content: fs.readFileSync(file, 'utf8') };
  });

  fs.writeFileSync(
    libpath.resolve(rootDir, './src/cms/backends/repoFiles.json'),
    JSON.stringify(repoFiles),
    'utf8',
  );
});
