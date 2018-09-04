import glob from 'glob-promise';
import pathToRegexp from 'path-to-regexp';
import crypto from 'crypto';
import path from 'path';
import getJSONFromFile from './getJSONFromFile';
import slugify from './slugify';

function generateHash(text) {
  const hash = crypto.createHash('sha512');
  hash.update(text, 'utf8');
  return hash.digest('hex').slice(0, 8);
}

async function getArticleList(globStr, defaultValues = {}) {
  const files = await glob(globStr);
  const promises = files.map(getJSONFromFile);
  const results = (await Promise.all(promises))
    .map(info => ({ ...defaultValues, ...info }))
    .map(info => {
      const fileName = path.basename(info.filePath, '.md');
      return {
        ...info,
        permalink: decodeURIComponent(
          pathToRegexp.compile(info.permalink || '/:title')({
            ...info,
            month: `0${info.month}`.slice(-2),
            day: `0${info.day}`.slice(-2),
            title: slugify(fileName).replace(/^\d+-\d+-\d+-/, ''),
            hash: generateHash(fileName),
          }),
        ),
      };
    })
    .filter(info => info.published !== false || info.published !== 'false')
    .sort((a, b) => b.date - a.date);
  return results;
}

export default getArticleList;
