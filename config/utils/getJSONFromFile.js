import fs from 'fs-extra';
import path from 'path';
import Remark from 'remark';
import remarkFrontMatter from 'remark-frontmatter';
import remarkInlineLinks from 'remark-inline-links';
import remarkToRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import hastToString from 'hast-util-to-string';
import visit from 'unist-util-visit';
import removePosition from 'unist-util-remove-position';
import YAML from 'js-yaml';
import moment from 'moment';

import getYoutubeThumbnail from './getYoutubeThumbnail';

const remark = Remark()
  .use(remarkFrontMatter)
  .use(remarkInlineLinks)
  .use(remarkToRehype, { allowDangerousHTML: true })
  .use(rehypeRaw)
  .freeze();

async function getJSONFromFile(filePath) {
  const fileName = path.basename(filePath);
  const config = {
    filePath: path.relative(path.resolve(__dirname, '../../'), filePath),
  };

  const ast = remark.parse(await fs.readFile(filePath, 'utf8'));

  // YAML Frontmatter
  if (ast.children[0].type === 'yaml') {
    const { value: configStr } = ast.children.shift();
    Object.assign(config, YAML.safeLoad(configStr) || {}, config);
  }

  // MDAST to HAST
  const contentHast = removePosition(await remark.run(ast), true);
  const contentText = hastToString(contentHast).replace(/\n/g, '');
  Object.assign(
    config,
    {
      content: contentHast,
      description: contentText.length <= 140 ? contentText : `${contentText.slice(0, 140)}...`,
    },
    config,
  );

  // Category
  if (!config.category) {
    config.category = (config.categories || [])[0];
  }
  // Date
  const dateStr = config.date || (fileName.match(/^(\d+[/-]\d+[/-]\d+)/) || [])[1];
  const date = moment(dateStr, [
    'YYYY-MM-DD HH:mm Z',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD',
    moment.ISO_8601,
  ]);
  Object.assign(config, {
    date: date.toDate(),
    year: date.year(),
    month: date.month() + 1,
    day: date.date(),
  });
  // Thumbnail
  if (!config.thumbnail) {
    visit(ast, 'image', node => {
      if (node.url) {
        config.thumbnail = node.url;
        return false;
      }
      return true;
    });
  }
  if (!config.thumbnail) {
    config.thumbnail = await getYoutubeThumbnail(config.content);
  }

  return config;
}

export default getJSONFromFile;
