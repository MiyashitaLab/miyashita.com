import React from 'react';
import ReactLoading from 'react-loading';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Loading.css';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
    };
    setTimeout(() => this.setState(() => ({ waiting: false })), props.wait || 1000);
  }

  render() {
    const props = this.props;
    const { waiting } = this.state;

    return waiting ? (
      <div />
    ) : (
      <div className={styles.base}>
        <ReactLoading type="spinningBubbles" color="#424242" delay={0} />
      </div>
    );
  }
}

export default withStyles(styles)(Loading);
