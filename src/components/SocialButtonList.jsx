import React from 'react';
import url from 'url';
import encodeUrl from 'encodeurl';

import styles from './SocialButtonList.css';
import SocialButton from '~/components/SocialButton';
import { withRouter } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import withSiteData from '~/lib/withSiteData';
import withRouteData from '~/lib/withRouteData';

const Utils = {
  getPageUrl(baseUrl, path) {
    return encodeUrl(url.resolve(baseUrl, path));
  },
  getPageTitle(siteTitle, title) {
    return `${title} | ${siteTitle}`;
  },
  getTwitterUrl(title, url) {
    const pageTitle = encodeURIComponent(title);
    const pageUrl = encodeURIComponent(url);
    return `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
  },
  getFacebookUrl(url) {
    const pageUrl = encodeURIComponent(url);
    return `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  },
};

const SocialButtonList = ({ site, page, location }) => {
  const pageTitle = Utils.getPageTitle(site.title, page.title);
  const pageUrl = Utils.getPageUrl(site.root, location.pathname);

  return (
    <div className={styles.base}>
      <SocialButton
        href={Utils.getTwitterUrl(pageTitle, pageUrl)}
        color="#1DA1F2"
        text="Tweet"
        icon="twitter"
      />
      <SocialButton
        href={Utils.getFacebookUrl(pageUrl)}
        color="#3B5998"
        text="Share"
        icon="facebook-official"
      />
    </div>
  );
};

export default withSiteData(withRouteData(withRouter(withStyles(styles)(SocialButtonList))));
