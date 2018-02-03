import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouteData } from 'react-static';

import styles from './NewsList.css';
import withMetadata from '~/lib/withMetadata';
import ArticleHeader from '~/components/ArticleHeader';
import ArticleCard from '~/components/ArticleCard';
import Pagination from '~/components/Pagination';

const NewsList = ({ page }) => (
  <div className={styles.base}>
    <ArticleHeader title="ニュース" src={''} />
    <div className={styles.content}>
      <section className={styles.section}>
        <div className={styles.newsList}>
          {page.items.map(item => <ArticleCard key={item.title} wide={true} item={item} />)}
        </div>
      </section>
      <Pagination current={page.count} maxCount={page.maxCount} basePath={page.basePath} />
    </div>
  </div>
);

export default withMetadata(withRouteData(withStyles(styles)(NewsList)));
