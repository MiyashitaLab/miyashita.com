import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './JekyllContent.css';

const JekyllContent = props => (
  <div className={styles.base}>
    <div dangerouslySetInnerHTML={{ __html: props.html }} />
  </div>
);

export default withStyles(styles)(JekyllContent);
