import React from 'react';

import styles from './FaceImage.css';
import OptimizedImage from '~/components/OptimizedImage';
import withStyles from 'isomorphic-style-loader/withStyles';

const FaceImage = ({ src, size }) => (
  <div className={styles.base} style={{ width: size && `${size}px`, height: size && `${size}px` }}>
    <div className={styles.imagePadding} />
    <OptimizedImage className={styles.image} src={src} width={size} height={size} />
  </div>
);

export default withStyles(styles)(FaceImage);
