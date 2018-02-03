import libpath from 'path';
import { attempt, isError } from 'lodash';
import uuid from 'uuid/v4';
import AuthenticationPage from './AuthenticationPage';

let repoFiles = {};
if (process.env.NODE_ENV !== 'production') {
  repoFiles = require('../repoFiles.json');
}

function fileExtension(filepath) {
  return libpath.extname(libpath.basename(filepath)).slice(1);
}

class Repo {
  store = JSON.parse(localStorage.getItem('repo') || 'false') || repoFiles;

  getFolders() {
    return this.store;
  }

  getFolder(folderName) {
    return this.store[folderName] || {};
  }

  getFile(path) {
    const folderName = libpath.dirname(path);
    const fileName = libpath.basename(path);
    return this.getFolder(folderName)[fileName] || {};
  }

  saveFile(path, obj) {
    const folderName = libpath.dirname(path);
    const fileName = libpath.basename(path);
    this.store[folderName] = this.store[folderName] || {};
    this.store[folderName][fileName] = obj;
    localStorage.setItem('repo', JSON.stringify(this.store));
  }

  deleteFile(path) {
    const folderName = libpath.dirname(path);
    const fileName = libpath.basename(path);
    delete this.store[folderName][fileName];
    localStorage.setItem('repo', JSON.stringify(this.store));
  }
}

export default class TestRepo {
  constructor(config) {
    this.config = config;
    this.assets = [];
    this.store = new Repo();
  }

  authComponent() {
    return AuthenticationPage;
  }

  restoreUser(_user) {
    return this.authenticate();
  }

  authenticate() {
    return Promise.resolve();
  }

  logout() {
    return null;
  }

  getToken() {
    return Promise.resolve('');
  }

  entriesByFolder(collection, extension) {
    const entries = [];
    const folderName = collection.get('folder');
    const folder = this.store.getFolder(folderName);
    for (const path in folder) {
      if (fileExtension(path) !== extension) {
        continue;
      }
      entries.push({
        file: { path: `${folderName}/${path}` },
        data: folder[path].content,
      });
    }
    return Promise.resolve(entries);
  }

  entriesByFiles(collection) {
    const files = collection.get('files').map(collectionFile => ({
      path: collectionFile.get('file'),
      label: collectionFile.get('label'),
    }));
    return Promise.all(
      files.map(file => ({
        file,
        data: this.store.getFile(file.path).content,
      })),
    );
  }

  getEntry(collection, slug, path) {
    return Promise.resolve({
      file: { path },
      data: this.store.getFile(path).content,
    });
  }

  persistEntry(entry, _mediaFiles = [], _options) {
    this.store.saveFile(entry.path, { content: entry.raw });
    return Promise.resolve();
  }

  getMedia() {
    return Promise.resolve(this.assets);
  }

  persistMedia({ fileObj }) {
    const { name, size } = fileObj;
    const objectUrl = attempt(window.URL.createObjectURL, fileObj);
    const url = isError(objectUrl) ? '' : objectUrl;
    const normalizedAsset = { id: uuid(), name, size, path: url, url };

    this.assets.push(normalizedAsset);
    return Promise.resolve(normalizedAsset);
  }

  deleteFile(path, _commitMessage) {
    const assetIndex = this.assets.findIndex(asset => asset.path === path);
    if (assetIndex > -1) {
      this.assets.splice(assetIndex, 1);
    } else {
      this.store.deleteFile(path);
    }

    return Promise.resolve();
  }
}
