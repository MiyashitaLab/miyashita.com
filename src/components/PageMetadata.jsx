import React from 'react';
import url from 'url';
import { withRouter } from 'react-router';
import { Head, withSiteData, withRouteData } from 'react-static';

function generateTitle({ page, site }) {
  return page.title ? `${page.title} | ${site.title}` : site.title;
}

const PageMetadata = ({ site, page, location }) => {
  const href = url.format({ ...url.parse(site.root), pathname: location.pathname });
  const title = generateTitle({ site, page });
  const description = page.description || site.description;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={href} />
      {/* OGP */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={href} />
      <meta property="og:title" content={title} />
      {page.thumbnail && <meta property="og:image" content={page.thumbnail} />}
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={site.title} />
      <meta property="og:locale" content="ja_JP" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={site.twitter} />
      <meta name="twitter:url" content={href} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {page.thumbnail && <meta name="twitter:image" content={page.thumbnail} />}
    </Head>
  );
};

export default withSiteData(withRouteData(withRouter(PageMetadata)));
