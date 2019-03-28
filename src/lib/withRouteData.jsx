import React from 'react';
import { RouteData } from 'react-static';

/** @param {React.ComponentType} Component */
const withRouteData = Component => props => (
  <RouteData>{({ page }) => <Component page={page} {...props} />}</RouteData>
);

export default withRouteData;
