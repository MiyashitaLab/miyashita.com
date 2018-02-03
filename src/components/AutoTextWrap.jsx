import React from 'react';
import Mikan from 'mikanjs';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './AutoTextWrap.css';

const AutoTextWrap = ({ text }) => {
  const words = Mikan.split(text);
  return (
    <span>
      {words.map((word, idx) => (
        <span key={idx} role="presentation" className={styles.word}>
          {word}
        </span>
      ))}
    </span>
  );
};

export default withStyles(styles)(AutoTextWrap);
