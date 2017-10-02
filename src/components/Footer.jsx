import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Footer.css';

const Footer = () => (
  <div className={styles.base}>
    <div className={styles.wrapper}>
      <span>Footer</span>
    </div>
  </div>
);

export default withStyles(styles)(Footer);
