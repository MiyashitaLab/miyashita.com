import React from 'react';
import tinytime from 'tinytime';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

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
  'https://lh3.googleusercontent.com/ypqAGQLHvNZcOfVHv-960lbtticQC98XJfjpA471NLhFQarU8BTdSJicgTmbACdM6yocLNtgaECXRm7Aw5Eqe2PkL_B7skDuRwAbD9gce8LFlVhXP0CfLskrtXmB9M2Tejc9YG_OkJu1pp-7Z8YSpdFPOwAKyVMBrDn7U_5i_3SBkhtPNQq76T9exLzlaec6hVSsWPXTBY9xb3xCvK7SRprxLCYQcPmv-l76yiaiKeXmExm430qwBHLa2MHO1fm4YUIyca22qVHnODFTsphOdSf9tryT7yAMkcuJmeplDu4cPSera2Ac6s8ILfkX9uIgFBMIjyG2Q2VTfJ6JgCF2FBbbqdiYqnHWl_Bg9mMRW2rkqQ36uK0m0X4jR5d7CabLvXToQdVKbWrG2TZTQow0d_Lbx_zvn5JN3w5QObue_jT7naCpGiKd1jzyZwzeL7LB9gz6BlK1Hc704RlkikxVe57rTq7lnQrtsnJwaHKAKS6EY575rHVrxem6C37GkQNVTesXK1S9nkcNmmx3JoAB9uOY7yuF0fWdTQn1d4Szz7l3S2OzbKQbvsqof9l9YLt1Fb0qogRulsP4iY99SKw50BDm-hS9ViWxwHm9wWYOMw=s0';

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
            <FontAwesome name="angle-right" />
            <span>続きを読む</span>
          </small>
        </Link>
      </ItemCard>
    );
  }
}

export default withStyles(styles)(ArticleCard);
