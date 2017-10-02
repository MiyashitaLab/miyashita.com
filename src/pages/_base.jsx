import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './_base.css';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

const wrapper = withStyles(styles)(props => <div className={styles.transitionWrapper}>{props.children}</div>);

const Base = props => (
  <div className={styles.base}>
    <header>
      <Nav />
    </header>
    <main className={styles.main}>
      <TransitionGroup component={wrapper}>{props.children}</TransitionGroup>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
);

export default withStyles(styles)(Base);
