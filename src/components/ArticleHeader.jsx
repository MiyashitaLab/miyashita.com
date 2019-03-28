import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './ArticleHeader.css';
import AutoTextWrap from '~/components/AutoTextWrap';
import OptimizedImage from '~/components/OptimizedImage';

const ArticleHeader = ({ src, blur, title }) => (
  <div className={styles.header}>
    <div className={styles.headerWrapper}>
      <div className={styles.bgImageWrapper}>
        <OptimizedImage className={styles.bgImage} src={src} height="320" />
      </div>
      <div
        className={classnames({
          [styles.imageWrapper]: true,
          [styles.headerBlur]: blur,
        })}
      >
        <OptimizedImage className={styles.image} src={src} height="320" />
      </div>
      <div className={styles.headerCover}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            <p className={styles.border}>
              <AutoTextWrap text={title} />
            </p>
          </h1>
        </div>
      </div>
    </div>
  </div>
);

ArticleHeader.defaultProps = {
  blur: false,
};

export default withStyles(styles)(ArticleHeader);
