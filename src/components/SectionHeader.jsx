import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './SectionHeader.css';
import Link from '~/components/Link';

const SectionHeader = ({ children, href }) => (
  <header className={styles.base}>
    <h2 className={styles.header}>
      {href ? (
        <Link href={href} className={styles.link}>
          <span className={styles.headerInner}>{children}</span>
        </Link>
      ) : (
        <span className={styles.headerInner}>{children}</span>
      )}
    </h2>
  </header>
);

export default withStyles(styles)(SectionHeader);
