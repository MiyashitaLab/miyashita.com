import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './Member.css';
import withTracker from '~/lib/withTracker';
import withMetadata from '~/lib/withMetadata';
import withRouteData from '~/lib/withRouteData';
import FaceImage from '~/components/FaceImage';
import SocialButtonList from '~/components/SocialButtonList';
import MarkdownContent from '~/components/MarkdownContent';

const Member = ({ page }) => (
  <div className={styles.base}>
    <div className={styles.imageWrapper}>
      <FaceImage src={page.avatar} size="200" />
    </div>
    <div className={styles.content}>
      <h1>{page.title}</h1>
      {!page.preview && <SocialButtonList title={page.title} />}
      <MarkdownContent ast={page.content} />
    </div>
  </div>
);

const MemberWithStyles = withStyles(styles)(Member);

export { MemberWithStyles as Member };
export default withTracker(withMetadata(withRouteData(MemberWithStyles)));
