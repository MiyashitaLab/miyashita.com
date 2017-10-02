import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'found';
import Sticky from 'react-stickynode';

import styles from './Nav.css';
import logoImgPath from '../assets/logo.png';

import SearchInput from './SearchInput';

const Nav = () => (
  <Sticky>
    <nav className={styles.base}>
      <div className={styles.wrapper}>
        <div className={`${styles.col} ${styles.rightCol}`}>
          <Link to="/">
            <img className={styles.logoImg} src={logoImgPath} alt="logo" />
          </Link>
        </div>
        <div className={`${styles.col} ${styles.leftCol}`}>
          <div className={styles.searchInputWrapper}>
            <SearchInput />
          </div>
        </div>
      </div>
    </nav>
  </Sticky>
);

export default withStyles(styles)(Nav);
