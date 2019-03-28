import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './HomeHeader.css';
import OptimizedImage from '~/components/OptimizedImage';

const imageUrl =
  'https://lh3.googleusercontent.com/-aoBDdhNjnT0/Wu7DeGXWh-I/AAAAAAAAF7I/AkPdfcTyrpoljCGadr3qqoFu-oZtiKA0wCE0YBhgL/w1024/';

const HomeHeader = () => (
  <header className={styles.base}>
    <div className={styles.imageWrapper}>
      <OptimizedImage className={styles.image} src={imageUrl} width="1024" alt="Miyashita Lab" />
    </div>
    <div className={styles.bgImageWrapper}>
      <OptimizedImage className={styles.bgImage} src={imageUrl} width="1024" alt="Miyashita Lab" />
    </div>
  </header>
);

export default withStyles(styles)(HomeHeader);
