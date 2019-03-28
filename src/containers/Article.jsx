import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './Article.css';
import withTracker from '~/lib/withTracker';
import withMetadata from '~/lib/withMetadata';
import withRouteData from '~/lib/withRouteData';
import ArticleHeader from '~/components/ArticleHeader';
import SocialButtonList from '~/components/SocialButtonList';
import MarkdownContent from '~/components/MarkdownContent';

const Article = ({ page }) => (
  <div className={styles.base}>
    <ArticleHeader title={page.title} src={page.thumbnail} blur={true} />
    <div className={styles.content}>
      {!page.preview && <SocialButtonList title={page.title} />}
      <MarkdownContent ast={page.content} />
    </div>
  </div>
);

const ArticleWithStyles = withStyles(styles)(Article);

export { ArticleWithStyles as Article };
export default withTracker(withMetadata(withRouteData(ArticleWithStyles)));
