import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './PageNav.css';
import SearchInput from '~/components/SearchInput';
import OptimizedImage from '~/components/OptimizedImage';
import Link from '~/components/Link';

const logoImg =
  'https://lh3.googleusercontent.com/GWKvlXElFO095znbPRbexWAhGOoPAgdpZTGIhTUmLwCk6qiPShZaO9wHcpnuCyj9Ao14qgTixzWF6Bhgyna__6LXVvMSLgrdoiTcO4BsSpVu0M7_7Mf2xkdjDPgjUqhIHUUIs3BbgIQvOyCxVXf3gNI-K5N_W37xqfcWhED68B26bfit31qx0nGWyfGwPKT8Y9A2yWJrQPbfkWaOJB0Qqu4Swr3zYCrozrXVRtqbe0BtXILmmTmGeVQ9Ed7YgVyJIoSPFCwIXnkDijdUk2-ixB-NeBZ0IN_TkMh1bxbLUswN9ZwBcMStCM3KZUS6N0Nq6R2S8A3ISgBLN8YU7hT48Fr5y6EBd_BHmXpXBphXVCPGocGCz1AAutaNK1ocpIrTcuqLiXiSRJOm4Ae5ErX_h2EsXHmpEelJHx7d3Em2UkkI0v2rCRQQfkgxl-SFIae272f6ggj778HotznlLrHr1cSQI0uJOmK0cNRc9iUF3-TZFrsOz65KzDfSyNcIplQDpn8QGVF9HmdysmnWlXVpA-4kHzn6s6ctxcnAbdBuhq68CNvbs8ILpkXlY6Z3C1DkxRQzQ2v612ktTmR7b2nQKBF4TgWoOmD0CpVCqN5dGg=s0';

const PageNav = () => (
  <nav className={styles.base}>
    <div className={styles.wrapper}>
      <div className={classnames([styles.col, styles.rightCol])}>
        <Link className={styles.logoImgWrapper} href="/">
          <OptimizedImage
            className={styles.logoImg}
            src={logoImg}
            alt="logo"
            options={{ progressive: false, lazyload: false }}
          />
        </Link>
      </div>
      <div className={classnames([styles.col, styles.leftCol])}>
        <div className={styles.searchInputWrapper}>
          <SearchInput />
        </div>
      </div>
    </div>
  </nav>
);

export default withStyles(styles)(PageNav);
