import React from 'react';
import tinytime from 'tinytime';

import styles from './NewsHeader.css';
import AutoTextWrap from '~/components/AutoTextWrap';
import OptimizedImage from '~/components/OptimizedImage';
import withStyles from 'isomorphic-style-loader/withStyles';

const dateTemplate = tinytime('{YYYY}/{Mo}/{DD}', {
  padMonth: true,
  padDays: true,
});

const NewsHeader = ({ src, title, date }) => {
  const dateText = dateTemplate.render(date);
  return (
    <div className={styles.header}>
      <div className={styles.imageWrapper}>
        <OptimizedImage className={styles.image} src={src} alt={title} />
      </div>
      <div className={styles.textWrapper}>
        <h1>
          <AutoTextWrap text={title} />
        </h1>
        <p className={styles.date}>
          <time dateTime={date.toISOString()}>{dateText}</time>
        </p>
      </div>
    </div>
  );
};

export default withStyles(styles)(NewsHeader);
