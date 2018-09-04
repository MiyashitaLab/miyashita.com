import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './PageNav.css';
import SearchInput from '~/components/SearchInput';
import OptimizedImage from '~/components/OptimizedImage';
import Link from '~/components/Link';

const logoImg =
  'https://lh3.googleusercontent.com/-QPw7WLxdN9M/W44p1fOm4XI/AAAAAAAAILA/4JiqVbXKQaYElaAR6j4jFhE2bZVUn_f6wCE0YBhgL/s0/sublogo1.png';

const PageNav = () => (
  <nav className={styles.base}>
    <div className={styles.wrapper}>
      <div className={classnames([styles.col, styles.rightCol])}>
        <Link className={styles.logoImgWrapper} href="/">
          <OptimizedImage
            className={styles.logoImg}
            src={logoImg}
            alt="logo"
            options={{ progressive: false, lazyload: false }}
          />
        </Link>
      </div>
      <div className={classnames([styles.col, styles.leftCol])}>
        {/* <div className={styles.searchInputWrapper}>
          <SearchInput />
        </div> */}
      </div>
    </div>
  </nav>
);

export default withStyles(styles)(PageNav);
