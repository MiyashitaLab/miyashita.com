import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './SectionHeader.css';

const SectionHeader = ({ children }) => (
  <header className={styles.base}>
    <h2 className={styles.header}>
      <span className={styles.headerInner}>{children}</span>
    </h2>
  </header>
);

export default withStyles(styles)(SectionHeader);
