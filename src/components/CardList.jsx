import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './CardList.css';

const CardList = ({ wrap, children }) => (
  <div className={styles.base}>
    <div className={styles.outer}>
      <div
        className={classnames({
          [styles.inner]: true,
          [styles.innerWrap]: wrap,
        })}
      >
        {children}
      </div>
    </div>
  </div>
);

export default withStyles(styles)(CardList);
