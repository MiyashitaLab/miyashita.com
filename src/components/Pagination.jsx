import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import classnames from 'classnames';

import styles from './Pagination.css';
import Link from '~/components/Link';

class Pagination extends React.Component {
  get isShownPrevDots() {
    return this.props.current - 2 > 1;
  }

  get isShownNextDots() {
    return this.props.current + 2 < this.props.maxCount;
  }

  getPagination = () => {
    const { current, maxCount } = this.props;
    const startCount = Math.max(current - 2, 1);
    const lastCount = Math.min(current + 2, maxCount);

    const pagination = [];
    for (let cnt = startCount; cnt <= lastCount; cnt++) {
      pagination.push(
        <li key={cnt} className={styles.linkWrapper}>
          {this.generateLink(cnt)}
        </li>,
      );
    }
    return pagination;
  };

  generateLink = pageNum => {
    const { current } = this.props;
    if (pageNum !== current) {
      return (
        <Link
          className={classnames([styles.link, styles.enabled])}
          href={this.generatePath(pageNum)}
          innerClassName={styles.linkBody}
        >
          {pageNum}
        </Link>
      );
    } else {
      return <span className={classnames([styles.link, styles.current])}>{pageNum}</span>;
    }
  };

  generatePath = cnt => {
    if (cnt <= 1) {
      return this.props.basePath;
    }
    return `${this.props.basePath}page/${cnt}/`;
  };

  render() {
    const dots = (
      <li className={styles.linkWrapper}>
        <span className={classnames([styles.link, styles.disabled])}>{'...'}</span>
      </li>
    );

    return (
      <div className={styles.base}>
        <ul className={styles.wrapper}>
          {this.isShownPrevDots && dots}
          {this.getPagination()}
          {this.isShownNextDots && dots}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(Pagination);
