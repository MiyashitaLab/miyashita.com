import fs from 'fs-extra';
import url from 'url';
import path from 'path';
import cheerio from 'cheerio';
import encodeUrl from 'encodeurl';
import getRoutes from './react-static/getRoutes';

async function generateRedirects(currentRoutes) {
  const prevRedirects = JSON.parse(
    await fs.readFile(path.resolve(__dirname, './redirects/redirects.json'), 'utf8'),
  );
  const prevSitemap = await (async () => {
    const sitemap = await fs.readFile(
      path.resolve(__dirname, './redirects/miyashita.com.sitemap.xml'),
      'utf8',
    );
    const $ = cheerio.load(sitemap, { xmlMode: true });
    const $loc = $('loc');
    return $loc
      .map((_, el) => cheerio(el).text())
      .get()
      .map(link => decodeURIComponent(url.parse(link).pathname));
  })();

  const redirects = [];
  for (const route of currentRoutes) {
    if (!route.getData) {
      continue;
    }

    const info = await route.getData();
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
      redirects.push(`/wp/posts/${info.page._id}  ${route.path}  301!`);
    }
    if (prevSitemap.indexOf(route.path) !== -1) {
      prevSitemap.splice(prevSitemap.indexOf(route.path), 1);
    }
  }

  const staticRedirects = await fs.readFile(
    path.resolve(__dirname, '../articles/redirects.txt'),
    'utf8',
  );
  const redirectsText = `${staticRedirects}\n${redirects.join('\n')}`
    .split('\n')
    .map(line => {
      // To percentage-encode for non-ascii URL
      const args = line.split(/\s+/);
      args[0] = encodeUrl(args[0]);
      args[args.length - 2] = encodeUrl(args[args.length - 2]);
      return args.join('\x20\x20');
    })
    .join('\n');
  await fs.writeFile(path.resolve(__dirname, '../public/_redirects'), redirectsText, 'utf8');

  console.error(prevSitemap.join('\n'));
}

// prebuild
(async function prebuild() {
  const routes = await getRoutes();
  await generateRedirects(routes);
})().catch(console.error);
