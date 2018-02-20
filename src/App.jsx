import React from 'react';
import { Router } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './App.css';
import Loader from '~/components/Loader';
import PageNav from '~/components/PageNav';
import PageFooter from '~/components/PageFooter';
import AnimatedRoutes from '~/components/AnimatedRoutes';

const App = () => (
  <Router>
    <div className={styles.base}>
      <Loader />
      <header className={styles.header}>
        <PageNav />
      </header>
      <main className={styles.main}>
        <AnimatedRoutes />
      </main>
      <footer className={styles.footer}>
        <PageFooter />
      </footer>
    </div>
  </Router>
);

export default withStyles(styles)(App);
