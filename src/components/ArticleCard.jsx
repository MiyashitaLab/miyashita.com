import React from 'react';
import tinytime from 'tinytime';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './ArticleCard.css';
import ItemCard from '~/components/ItemCard';
import Link from '~/components/Link';
import FontAwesome from '~/components/FontAwesome';
import OptimizedImage from '~/components/OptimizedImage';

const dateTemplate = tinytime('{YYYY}/{Mo}/{DD}', {
  padMonth: true,
  padDays: true,
});

const noImage =
  'https://lh3.googleusercontent.com/-Jg11be_N1pM/W44riQZisJI/AAAAAAAAILg/RVtrOK19mVgkyZSH7zHLSBiqVX180gy-ACE0YBhgL/s400/noimage.png';

/**
 * @typedef Props
 * @prop {*} item
 * @prop {boolean} wide
 */
/**
 * @typedef State
 * @prop {string} dateText
 */
class ArticleCard extends React.Component {
  get date() {
    const { item } = this.props;
    return item.date && new Date(item.date);
  }

  get dateText() {
    const date = this.date;
    return date && dateTemplate.render(new Date(date));
  }

  render() {
    const { wide, item } = this.props;

    return (
      <ItemCard wide={wide}>
        <Link className={styles.item} href={item.permalink}>
          <div className={styles.thumbnailImageWrapper}>
            <OptimizedImage
              className={styles.thumbnailImage}
              src={item.thumbnail || noImage}
              width="350"
            />
          </div>
          {this.date && (
            <p className={styles.datetime}>
              <small>
                <time dateTime={this.date.toISOString()}>{this.dateText}</time>
              </small>
            </p>
          )}
          <p className={styles.title}>
            <strong>{item.title}</strong>
          </p>
          <small className={styles.readmore}>
            <span>詳細</span>
            <FontAwesome name="angle-right" />
          </small>
        </Link>
      </ItemCard>
    );
  }
}

export default withStyles(styles)(ArticleCard);
