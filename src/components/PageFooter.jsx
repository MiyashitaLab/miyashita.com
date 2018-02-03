import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './PageFooter.css';

const PageFooter = () => (
  <div className={styles.base}>
    <div className={styles.wrapper}>
      <div className={styles.footer}>
        <p>&copy; 宮下研究室</p>
        <p>〒164-8525 東京都中野区中野 4-21-1</p>
        <p>明治大学 総合数理学部 先端メディアサイエンス学科 宮下研究室</p>
        <p>研究室：1018室&nbsp;&nbsp;実験室：1017室</p>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(PageFooter);
