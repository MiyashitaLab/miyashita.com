import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import unified from 'unified';
import rehypeReact from 'rehype-react';

import styles from './MarkdownContent.css';
import Link from '~/components/Link';
import AwesomeIframe from '~/components/AwesomeIframe';
import OptimizedImage from '~/components/OptimizedImage';

const processor = unified()
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
      a: 'CMS' in global ? 'a' : Link,
      iframe: AwesomeIframe,
      img: function MarkdownImage(props) {
        return <OptimizedImage {...props} width={500} />;
      },
    },
  })
  .freeze();

const MarkdownContent = ({ ast }) => (
  <div className={styles.markdownBody}>{processor.stringify(ast)}</div>
);
MarkdownContent.defaultProps = {
  ast: {
    type: 'element',
    tagName: 'div',
    properties: {},
    children: [],
  },
};

export default withStyles(styles)(MarkdownContent);
