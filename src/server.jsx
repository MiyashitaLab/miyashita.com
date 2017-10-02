import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { getFarceResult } from 'found/lib/server';
import EJS from 'ejs';
import fs from 'fs-extra';
import path from 'path';
import WithStylesContext from './components/WithStylesContext';
import TemplateHTML from './index.html';
import router from './router';

const routing = {
  '/': './build/index.html',
  '/redirect/': './build/redirect/index.html',
  '/members/': './build/members/index.html',
  '/members/id/': './build/_layouts/member.html',
  '/projects/': './build/projects/index.html',
  '/projects/id/': './build/_layouts/project.html',
};

const render = EJS.compile(TemplateHTML);

async function renderFromPath(routePath) {
  const { element } = await getFarceResult(Object.assign({ url: routePath }, router));

  const css = new Set();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <WithStylesContext onInsertCss={styles => css.add(styles._getCss())}>{element}</WithStylesContext>
  );

  return render({
    markup,
    css: [...css].join(''),
  });
}

Promise.all(
  Object.keys(routing).map(async routePath => {
    const filePath = path.resolve(process.cwd(), routing[routePath]);
    if (!await fs.pathExists(path.dirname(filePath))) {
      await fs.mkdirp(path.dirname(filePath));
    }
    await fs.writeFile(filePath, await renderFromPath(routePath), { encoding: 'utf8' });
    console.log(`Written to ${path.relative(process.cwd(), filePath)}`);
  })
).catch(err => {
  console.error(err.stack || err);
  process.exit(255);
});
