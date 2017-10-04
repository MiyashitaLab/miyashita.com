import React from 'react';
import { Link } from 'found';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import format from 'date-fns/format';
import styles from './ThumbnailCard.css';

const ThumbnailCard = props => {
  const { item } = props;
  return (
    <div className={styles.itemWrapper}>
      <Link className={styles.item} to={item.url}>
        <div
          className={styles.thumbnailImage}
          style={{
            backgroundImage: `url(${item.thumbnail})`,
          }}
        />
        {item.published instanceof Date && (
          <p className={styles.datetime}>
            <small>
              <time dateTime={format(item.published)}>{format(item.published, 'YYYY/MM/DD')}</time>
            </small>
          </p>
        )}
        <p className={styles.title}>
          <strong>{item.title}</strong>
        </p>
      </Link>
    </div>
  );
};

export default withStyles(styles)(ThumbnailCard);
