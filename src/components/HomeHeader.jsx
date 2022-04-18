import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './HomeHeader.css';
import OptimizedImage from '~/components/OptimizedImage';

const imageUrl =
  "https://miyashita.com/files/homeheader2022s.jpg"

const HomeHeader = () => (
  <header className={styles.base}>
    <div className={styles.imageWrapper}>
      <OptimizedImage className={styles.image} src={imageUrl} width="1280" alt="Miyashita Lab" />
    </div>
    <div className={styles.bgImageWrapper}>
      <OptimizedImage className={styles.bgImage} src={imageUrl} width="1280" alt="Miyashita Lab" />
    </div>
  </header>
);

export default withStyles(styles)(HomeHeader);
