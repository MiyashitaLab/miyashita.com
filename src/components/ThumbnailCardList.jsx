import React from 'react';
import { Link } from 'found';
import Icon from 'react-fontawesome';
import ReactLoading from 'react-loading';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import format from 'date-fns/format';
import styles from './ThumbnailCardList.css';

import ThumbnailCard from './ThumbnailCard';

class ThumbnailCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: 0,
    };

    this.onClickLeft = this.onClickLeft.bind(this);
    this.onClickRight = this.onClickRight.bind(this);
  }

  onClickLeft() {
    this.setState(state => ({
      scroll: Math.max(state.scroll - 1, 0),
    }));
  }

  onClickRight() {
    this.setState((state, props) => ({
      scroll: Math.min(state.scroll + 1, props.items.length - 3),
    }));
  }

  get isFirst() {
    return this.state.scroll === 0;
  }

  get isLast() {
    return this.state.scroll >= this.props.items.length - 3;
  }

  render() {
    const { items } = this.props;
    const { scroll } = this.state;

    return (
      <div className={styles.base}>
        <div className={styles.scrollButton} onClick={this.onClickLeft}>
          <Icon className={this.isFirst ? styles.scrollButtonDisabled : null} name="angle-left" />
        </div>
        <div className={styles.outer}>
          <div
            className={styles.inner}
            style={{
              transform: `translateX(calc(-${100 * scroll / 3}%))`,
            }}
          >
            {items.map(item => <ThumbnailCard key={item.id} item={item} />)}
          </div>
        </div>
        <div className={styles.scrollButton} onClick={this.onClickRight}>
          <Icon className={this.isLast ? styles.scrollButtonDisabled : null} name="angle-right" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ThumbnailCardList);
