import React from 'react';
import { Loading } from 'react-static';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

const Loader = () => (
  <Loading
    render={({ loading }) => {
      loading ? NProgress.isStarted() || NProgress.start() : NProgress.done();
      return null;
    }}
  />
);

export default Loader;
