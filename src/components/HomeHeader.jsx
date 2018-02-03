import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './HomeHeader.css';
import OptimizedImage from '~/components/OptimizedImage';

const imageUrl =
  'https://lh3.googleusercontent.com/CJooqogdxVxdLp45c0pBKu4yxJtjBHgEhXj8AKMC2RA3X9LlL9FNMk17JYw3DfUFi4jMDuGhofPApl_b3sFPVYwS25bdxBJRF2wY-0-2jW8qrf1Q3toKbxfSl3pb8aNaz9Z0tPpD8aWJTFLHN1YIZb2X83AkHl02rMnPGxdQzp3pNs65dajC5ejOi6ODnxKzVzc1EjMcnWcEtTbEWSkknD5IzG7YNB6L7H6BeHE-AIC15csGPNu_Avks77sP43XRmZIVCFDE3UK5IakV-UHVQUoTfoonDag0LsPJmWz_2k8kvGzujtQl4jzAQoYQ2h1l-mB4ZoRQsAVZLeh8swhOwCzFgUv8z5XLCUa9lpV3jJlCZ0zWzHXEX5fu6tvOUzuxvisVDeVFDjQbfz1fexelCBh-aIE-YsSSPnTy_UefLanFwUqgowt3hd9gvNekS8wybZJYM1GqtDm1orPh__oAo8JeQ9s5xDKy02zWqmQQSY5H2_N8dquOokQ9LP5h7KoUT-mcSfmPeyPcydNk2KiL0F6EDLXLL_mIRoWtb2oztTi-Bt6SaYu7sE3DtlDBsHVgTVUx70BSClwvdmaB81nvt2fR5dWU-PyfuGy_-GZ72Q=w1024';

const HomeHeader = () => (
  <header className={styles.base}>
    <div className={styles.imageWrapper}>
      <OptimizedImage className={styles.image} src={imageUrl} width="1024" alt="Miyashita Lab" />
    </div>
    <div className={styles.bgImageWrapper}>
      <OptimizedImage className={styles.bgImage} src={imageUrl} width="1024" alt="Miyashita Lab" />
    </div>
  </header>
);

export default withStyles(styles)(HomeHeader);
