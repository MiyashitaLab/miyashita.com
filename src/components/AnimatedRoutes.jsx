import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter } from 'react-router';
import Routes from 'react-static-routes';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './AnimatedRoutes.css';

const AnimatedRoutes = ({ location }) => (
  <TransitionGroup style={{ width: '100%' }}>
    <CSSTransition
      mountOnEnter={true}
      unmountOnExit={true}
      key={location.key}
      classNames={{
        enter: styles.pageEnter,
        enterActive: styles.pageEnterTo,
        exit: styles.pageLeave,
        exitActive: styles.pageLeaveTo,
      }}
      appear={false}
      exit={false}
      timeout={500}
    >
      <Routes />
    </CSSTransition>
  </TransitionGroup>
);

export default withRouter(withStyles(styles)(AnimatedRoutes));
