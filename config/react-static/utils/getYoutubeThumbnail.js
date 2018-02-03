import url from 'url';
import path from 'path';
import visit from 'unist-util-visit';

export default async function getYoutubeThumbnail(ast) {
  let youtubeUrl = null;

  visit(ast, 'element', node => {
    if (node.tagName === 'iframe' && /youtube\.com/.test(node.properties.src)) {
      youtubeUrl = node.properties.src;
      return false;
    }
    return true;
  });

  if (!youtubeUrl) {
    return null;
  }

  const id = path.basename(url.parse(youtubeUrl, true).pathname);
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
