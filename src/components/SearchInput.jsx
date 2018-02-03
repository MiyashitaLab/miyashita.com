import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './SearchInput.css';
import FontAwesome from '~/components/FontAwesome';

const SearchInput = () => (
  <form method="GET" action="https://research.miyashita.com/search/" className={styles.base}>
    <input type="text" placeholder="論文データベース検索" name="q" className={styles.input} />
    <FontAwesome name="search" />
  </form>
);

export default withStyles(styles)(SearchInput);
