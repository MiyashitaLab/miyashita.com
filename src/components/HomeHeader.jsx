import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './HomeHeader.css';
import OptimizedImage from '~/components/OptimizedImage';

const imageUrl =
  'https://lh3.googleusercontent.com/BZnryfXKjPpY0H4rs1e-lXxX-SNNd56k8mqeWrPCNppspOL4W2HLQZ7oNsEbxJb8CGvXAb5N0bAaTW7PUfF7Aqc1hJiRf7SwcIOiYlJ9BPvO8UOxyJ8BcoEmZu3rC0fkReLT5yfKf3wgh_dp2uQer-fazjJN8L9fXOaFle8hVmxG0UTCkzNGTTIzwKQuHuR7Ej_XO5VcJS-3e4d8Vodeen0Ml5-5HA6h2xThloW4PktXAdg56jWp_mjjsp274fGaLPsoA1az9zAo-GNOm6ax_OjmKv6EG1BLSf-yEe8-W16jtK71uP6wkxgo1jidfko0kbAdfp14f-DJG4VFDzK2Z7bm_mQsQCutygV9BZ29UJx7AbEtrM3Yqc7v0g-3EgxdMlDHPT8zebhhHn5rRLCciAeAoS7PObIuQxX3WqXUki0mxWTqerjf8YHBmgl3omX87rqcZWO4EaAAEHvrfuOVWQ3xmKQo55MzuFjvzUfRpW-WR8xYJLnyAWdETMFRPxM7JE9Up00HTolX29eRfNLFLTSNLD1H9a6A_Ju59_U7o5Mheetx1c18Q6yhiUDfoidZd16jBWRHv0giCZebMnj_-L9HSXg6YMyekAEah7sCUPJUsHJ1QZRxY2WgxtGmZ0gFNRldtUmw59wy2YqutPah0hivuBJBsYIBq3aYo1nBNtdQqyD-duRv_l9rF6XmroGCd1FFlR7hsZ3b2bmM-s3nof0U=w1024-h300-no?pageId=103824382426691254815';

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
