import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './ReadmoreCard.css';
import ItemCard from '~/components/ItemCard';
import Link from '~/components/Link';
import FontAwesome from '~/components/FontAwesome';

const ReadmoreCard = ({ wide, href }) => (
  <ItemCard wide={wide}>
    <Link className={styles.base} href={href} innerClassName={styles.iconWrapper}>
      <div>
        <FontAwesome className={styles.iconCircle} name="arrow-right" />
      </div>
    </Link>
  </ItemCard>
);

export default withStyles(styles)(ReadmoreCard);
