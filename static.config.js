import libpath from 'path';
import pkgDir from 'pkg-dir';
import Document from './src/components/Document';
import renderToHtml from './config/react-static/renderToHtml';
import webpack from './config/react-static/webpack.config';
import getRoutes from './config/react-static/getRoutes';

const isDev = process.env.NODE_ENV !== 'production';
const siteRoot = isDev ? 'http://localhost:3000/' : 'https://miyashita.com/';
const rootDir = pkgDir.sync(__dirname);

export default {
  entry: libpath.resolve(rootDir, './src/index.jsx'),
  Document,
  renderToHtml,
  webpack,
  getSiteData: () => ({
    site: {
      title: '宮下研究室 - 明治大学 総合数理学部 先端メディアサイエンス学科',
      description:
        '明治大学 総合数理学部 先端メディアサイエンス学科 / 明治大学大学院 先端数理科学研究科 先端メディアサイエンス専攻 宮下研究室',
      twitter: '@Miyashita_Lab',
      root: siteRoot,
    },
  }),
  siteRoot,
  getRoutes,
};
