import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './MemberCard.css';
import FaceImage from '~/components/FaceImage';
import Link from '~/components/Link';
import FontAwesome from '~/components/FontAwesome';

const MemberCard = ({ info }) => {
  const status =
    info.category === '99_OB'
      ? `${info.year_of_graduation}年度卒業`
      : `${info.category.split('_')[1]}${info.school_year || ''}`;

  return (
    <div className={styles.base}>
      <Link href={info.permalink}>
        <div className={styles.image}>
          <FaceImage src={info.avatar} />
        </div>
        <div className={styles.description}>
          <p className={styles.descriptionLine}>
            <small className={styles.status}>{status}</small>
          </p>
          <p className={styles.descriptionLine}>
            <span className={styles.name}>
              <span>{info.title}</span>
              <FontAwesome name="angle-right" />
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default withStyles(styles)(MemberCard);
