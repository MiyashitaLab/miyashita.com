import fs from 'fs-extra';
import url from 'url';
import path from 'path';
import cheerio from 'cheerio';
import getRoutes from './getRoutes';

async function generateJSON(routes) {
  for (const route of routes) {
    if (!route.getProps) {
      continue;
    }
    const info = await route.getProps();
    const filePath = path.resolve(__dirname, '../static/_data', `./${route.path}`, 'index.json');
    await fs.mkdirp(path.dirname(filePath));
    await fs.writeFile(filePath, JSON.stringify(info, (k, v) => (v == null ? undefined : v)), 'utf8');
  }
}

async function generateRoutes(routes) {
  let code = 'export default [\n';
  let routesArr = 'module.exports = [\n';
  for (const route of routes) {
    if (!route.path) {
      continue;
    }
    code +=
      '  {\n' +
      `    path: ${JSON.stringify(route.path)},\n` +
      `    component: () => import(${JSON.stringify(route.component)}).then(m => m.default || m),\n` +
      '  },\n';
    routesArr += `  ${JSON.stringify(route.path)},\n`;
  }
  code += '];';
  routesArr += '];';
  // await fs.writeFile(path.resolve(__dirname, '../routes.js'), code, 'utf8');
  await fs.writeFile(path.resolve(__dirname, '../routes.config.js'), routesArr, 'utf8');
}

async function generateRedirects(currentRoutes) {
  const prevRedirects = JSON.parse(await fs.readFile(path.resolve(__dirname, './redirects/redirects.json'), 'utf8'));
  const prevSitemap = await (async () => {
    const sitemap = await fs.readFile(path.resolve(__dirname, './redirects/miyashita.com.sitemap.xml'), 'utf8');
    const $ = cheerio.load(sitemap, { xmlMode: true });
    const $loc = $('loc');
    return $loc
      .map((_, el) => cheerio(el).text())
      .get()
      .map(link => decodeURIComponent(url.parse(link).pathname));
  })();

  const redirects = [];
  for (const route of currentRoutes) {
    if (!route.getProps) {
      continue;
    }

    const info = await route.getProps();
    if (info.page && info.page._id) {
      const prev = prevRedirects[String(info.page._id)];
      if (prev) {
        const prevPathname = decodeURIComponent(url.parse(prev).pathname);
        const comparePathname =
          url.parse(prev).hostname === 'news.miyashita.com' ? `/news${prevPathname}` : prevPathname;

        if (route.path !== comparePathname) {
          redirects.push(`${prevPathname}  ${route.path}  301`);
        }
        if (prevSitemap.indexOf(prevPathname) !== -1) {
          prevSitemap.splice(prevSitemap.indexOf(prevPathname), 1);
        }
      }
      redirects.push(`/  p=${info.page._id}  ${route.path}  301`);
    }
    if (prevSitemap.indexOf(route.path) !== -1) {
      prevSitemap.splice(prevSitemap.indexOf(route.path), 1);
    }
  }

  const staticRedirects = await fs.readFile(path.resolve(__dirname, '../articles/redirects.txt'), 'utf8');
  const redirectsText = `${staticRedirects}\n${redirects.join('\n')}`;
  await fs.writeFile(path.resolve(__dirname, '../static/_redirects'), redirectsText, 'utf8');

  console.error(prevSitemap.join('\n'));
}

// prebuild
(async function prebuild() {
  const routes = await getRoutes();
  await generateJSON(routes);
  await generateRoutes(routes);
  await generateRedirects(routes);
})().catch(console.error);
