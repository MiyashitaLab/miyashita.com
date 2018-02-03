import fs from 'fs-extra';
import path from 'path';
import encodeUrl from 'encodeurl';
import cheerio from 'cheerio';
import glob from 'glob-promise';

const DIST = path.resolve(__dirname, '../dist');

async function generateHeader() {
  let headersText = '# Auto generated';
  const pages = await glob(path.resolve(DIST, './**/*.html'));
  for (const page of pages) {
    const pathname = path
      .relative(DIST, page)
      .replace(/^\.?/, '/')
      .replace(/index\.html$/, '')
      .replace(/\.html$/, '');
    const $ = cheerio.load(await fs.readFile(page, 'utf8'));
    const headers = $('link[rel="preload"]')
      .map(
        (_, el) =>
          `\x20\x20Link: <${$(el).attr('href')}>; rel=preload; ${
            $(el).attr('as') ? `as=${$(el).attr('as')}` : ''
          }`,
      )
      .get();
    headersText += `\n${encodeUrl(pathname)}\n${headers.join('\n')}`;
  }
  await fs.writeFile(path.resolve(__dirname, '../dist/_headers'), headersText, 'utf8');
}

// postbuild
(async function prebuild() {
  await generateHeader();
})().catch(console.error);
