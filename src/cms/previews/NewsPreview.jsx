import React from 'react';
import CMS from 'netlify-cms'; // eslint-disable-line no-unused-vars
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import visit from 'unist-util-visit';

import styles from '~/styles/global.css';
import previewWrapper from '~/cms/lib/previewWrapper';
import parseMarkdown from '~/lib/parseMarkdown';
import { News } from '~/containers/News';

/**
 * @extends {React.SFC<CMS.PreviewProps>}
 */
const NewsPreview = ({ entry }) => {
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

  return <News page={{ ...props, preview: true, content: ast }} />;
};

export default previewWrapper(withStyles(styles)(NewsPreview));
