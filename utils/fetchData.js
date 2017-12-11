import fs from 'fs';
import path from 'path';
import axios from 'axios';

export default function fetchData({ isServer, route }) {
  const routePath = decodeURIComponent(route.path);
  const dataPath = (isServer ? path.posix : path).resolve('/_data', `./${routePath}`, 'index.json');
  if (isServer) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.posix.resolve('./static', `./${dataPath}`), 'utf8', (err, text) => {
        err ? reject(err) : resolve(JSON.parse(text));
      });
    });
  } else {
    return axios.get(dataPath).then(({ data }) => data);
  }
}
