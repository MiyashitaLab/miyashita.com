import React from 'react';
import Icon from 'react-fontawesome';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SearchInput.css';

const SearchInput = () => (
  <div className={styles.base}>
    <input type="text" placeholder="論文データベース検索" className={styles.input} />
    <Icon name="search" />
  </div>
);

export default withStyles(styles)(SearchInput);
