import React from 'react';
import * as CMS from 'netlify-cms'; // eslint-disable-line no-unused-vars
import withStyles from 'isomorphic-style-loader/withStyles';
import visit from 'unist-util-visit';

import styles from '~/styles/global.css';
import previewWrapper from '~/cms/lib/previewWrapper';
import parseMarkdown from '~/lib/parseMarkdown';
import { Article } from '~/containers/Article';

/**
 * @extends {React.SFC<CMS.PreviewProps>}
 */
const ArticlePreview = ({ entry }) => {
  const ast = parseMarkdown(entry.getIn(['data', 'body']));
  const props = entry.get('data').toJS();

  if (!props.thumbnail) {
    visit(ast, 'element', node => {
      if (node.tagName === 'img' && node.properties.src) {
        props.thumbnail = node.properties.src;
        return false;
      }
      return true;
    });
  }

  return <Article page={{ ...props, preview: true, content: ast }} />;
};

export default previewWrapper(withStyles(styles)(ArticlePreview));
