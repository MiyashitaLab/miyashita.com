import Remark from 'remark';
import remarkFrontMatter from 'remark-frontmatter';
import remarkInlineLinks from 'remark-inline-links';
import remarkToRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import removePosition from 'unist-util-remove-position';

const remark = Remark()
  .use(remarkFrontMatter)
  .use(remarkInlineLinks)
  .use(remarkToRehype, { allowDangerousHTML: true })
  .use(rehypeRaw)
  .freeze();

export { remark };

/**
 * @param {string} md
 */
export default function parseMarkdown(md) {
  const ast = remark.parse(md);
  return removePosition(remark.runSync(ast), true);
}
