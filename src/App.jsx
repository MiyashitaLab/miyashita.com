import React from 'react';
import { Root } from 'react-static';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './App.css';
// import Loader from '~/components/Loader';
import PageNav from '~/components/PageNav';
import PageFooter from '~/components/PageFooter';
import AnimatedRoutes from '~/components/AnimatedRoutes';

const App = () => (
  <Root>
    <div className={styles.base}>
      {/* <Loader /> */}
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
  </Root>
);

export default withStyles(styles)(App);
