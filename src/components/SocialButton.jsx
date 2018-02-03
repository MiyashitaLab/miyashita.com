import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './SocialButton.css';
import Link from '~/components/Link';
import FontAwesome from '~/components/FontAwesome';

const SocialButton = ({ href, color, icon, text }) => (
  <div className={styles.base}>
    <Link className={styles.button} href={href} style={{ backgroundColor: color }}>
      <FontAwesome className={styles.icon} name={icon} />
      <span>{text}</span>
    </Link>
  </div>
);

export default withStyles(styles)(SocialButton);
