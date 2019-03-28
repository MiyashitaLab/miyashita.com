import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './ItemCard.css';

const ItemCard = ({ wide, children }) => (
  <div
    className={classnames({
      [styles.itemWrapper]: true,
      [styles.wide]: wide,
    })}
  >
    <div className={styles.item}>{children}</div>
  </div>
);

export default withStyles(styles)(ItemCard);
