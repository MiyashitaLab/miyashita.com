import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Transition.css';

const Transition = props => (
  <CSSTransition
    {...props}
    classNames={{
      enter: styles.fadeEnter,
      enterActive: styles.fadeEnterActive,
      exit: styles.fadeExit,
      exitActive: styles.fadeExitActive,
    }}
    timeout={{ enter: 250, exit: 0 }}
  >
    {props.children}
  </CSSTransition>
);

export default withStyles(styles)(Transition);
