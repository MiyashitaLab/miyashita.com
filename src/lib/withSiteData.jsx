import React from 'react';
import { SiteData } from 'react-static';

/** @param {React.ComponentType} Component */
const withSiteData = Component => props => (
  <SiteData>{({ site }) => <Component site={site} {...props} />}</SiteData>
);

export default withSiteData;
