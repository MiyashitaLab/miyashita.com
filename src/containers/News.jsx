import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouteData } from 'react-static';

import styles from './News.css';
import withMetadata from '~/lib/withMetadata';
import NewsHeader from '~/components/NewsHeader';
import SocialButtonList from '~/components/SocialButtonList';
import MarkdownContent from '~/components/MarkdownContent';

const News = ({ page }) => {
  const date = new Date(page.date);

  return (
    <div className={styles.base}>
      <NewsHeader title={page.title} src={page.thumbnail} date={date} blur />
      <div className={styles.content}>
        {!page.preview && <SocialButtonList title={page.title} />}
        <MarkdownContent ast={page.content} />
      </div>
    </div>
  );
};

const NewsWithStyles = withStyles(styles)(News);

export { NewsWithStyles as News };
export default withMetadata(withRouteData(NewsWithStyles));
