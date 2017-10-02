import React from 'react';
import { Link } from 'found';
import ReactLoading from 'react-loading';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ThumbnailList.css';

const ThumbnailList = props => {
  const { items } = props;

  return (
    <div className={styles.base}>
      <div className={styles.wrapper}>
        {items.map(item => (
          <div key={item.id} className={styles.itemWrapper}>
            <Link className={styles.item} to={item.url}>
              <div
                className={styles.thumbnailImage}
                style={{
                  backgroundImage: `url(${item.thumbnail})`,
                }}
              />
              <strong className={styles.title}>{item.title}</strong>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withStyles(styles)(ThumbnailList);
