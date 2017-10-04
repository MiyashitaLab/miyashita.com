import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './_base.css';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TransitionPageGroup from '../components/TransitionPageGroup';

const Base = props => (
  <div className={styles.base}>
    <header>
      <Nav />
    </header>
    <main className={styles.main}>
      <TransitionPageGroup>{props.children}</TransitionPageGroup>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
);

export default withStyles(styles)(Base);
