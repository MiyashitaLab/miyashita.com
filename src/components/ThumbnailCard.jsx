import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import format from 'date-fns/format';
import styles from './ThumbnailCard.css';

import Link from './Link';
import NoImagePath from '../assets/noimage.png';

const ThumbnailCard = props => {
  const { item } = props;
  const isExternalURL = /^https?:\/\//.test(item.url);

  return (
    <div className={styles.itemWrapper}>
      <Link className={styles.item} to={isExternalURL ? null : item.url} href={isExternalURL ? item.url : null}>
        <div
          className={styles.thumbnailImage}
          style={{
            backgroundImage: `url(${item.thumbnail || NoImagePath})`,
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
