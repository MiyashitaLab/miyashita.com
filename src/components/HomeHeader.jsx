import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './HomeHeader.css';
import OptimizedImage from '~/components/OptimizedImage';

const imageUrl =
  'https://lh3.googleusercontent.com/zozUj1qHnX1RgGpIPb6KOrqbhbAuYJIWj9BTSmGdznzOurTGnL_0Z34XeGlPjopmr-sNNjwOJFRku-4h1tgrWzw6s5I--pviD38nNWvsy3A0sJql-SKOZlF3Alc-WQ3ZV3KXl64JlEci0LXreTtA6BhkgztkAda7S6TNG8RR2pWZVZLKZRpMozr51EjtbkhwtEm2N48KJdeC9roVbn-zpSk6MVghFJU8yresyuEbwN7_PjpLmkGlguv3oDReDpGAmwxVBmzw6CxjjG2dtN4HAUR2h3HYan_rL6ow7yzjQfa1rOilxNhywCDeHZFBpYZ-ZOqFW-4WjZkRpWezcUD0fpLm6E3io4IM3ULp6C4PI7JlRCTx5l34v68X7mXdVu5xIw4hEx2qXdEL_tCFFKGs3cK1Bp9MA4yvb9VLR5dl2fOiWXs84v6gHU4wQ_OmEWQgQv7QcUDNTJFfVvY7Mio_y0zGt7PbzHkhXroCkUj42wREx4g6ownStOBrAOA0-7pnlt37vnR5uMuKfAC0kpuP9O0rbpQ-8s73SLAQLgHtg-DLi6UQCTzs63I7tRwhml9jbluhHyP54MAmEGvuQtXf-M7808IfbOiM-Tljnd2CFYXY-3v_EVzKql_Nm_ZTXI-D0ccepY407YVHbVJUTDBhztlk-Yx0Dlt0T9fGmh7RLTmkXBWkIXV_DxEXJ81ASDSmdufhGcD-i9P8599air_hsUuq=w1920-h562-no?pageId=103824382426691254815';

const HomeHeader = () => (
  <header className={styles.base}>
    <div className={styles.imageWrapper}>
      <OptimizedImage className={styles.image} src={imageUrl} width="1280" alt="Miyashita Lab" />
    </div>
    <div className={styles.bgImageWrapper}>
      <OptimizedImage className={styles.bgImage} src={imageUrl} width="1280" alt="Miyashita Lab" />
    </div>
  </header>
);

export default withStyles(styles)(HomeHeader);
