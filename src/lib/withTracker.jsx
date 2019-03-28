// https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
import React from 'react';
import GoogleAnalytics from 'react-ga';
import { withRouter } from 'react-router-dom';

GoogleAnalytics.initialize('UA-25034793-2');

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  class HOC extends React.Component {
    static displayName = `withTracker(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(HOC);
};

export default withTracker;
