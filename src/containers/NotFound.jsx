import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './NotFound.css';
import withTracker from '~/lib/withTracker';
import withMetadata from '~/lib/withMetadata';
import Link from '~/components/Link';
import FontAwesome from '~/components/FontAwesome';

const NotFound = () => (
  <div className={styles.base}>
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1>404 | Not Found</h1>
        <p>この URL は存在していません．</p>
        <p>
          <Link className={styles.link} href="/">
            <FontAwesome name="angle-left" />
            ページトップに戻る
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default withTracker(withMetadata(withStyles(styles)(NotFound)));
