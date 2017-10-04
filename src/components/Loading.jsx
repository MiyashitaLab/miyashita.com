import React from 'react';
import ReactLoading from 'react-loading';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Loading.css';

class Loading extends React.Component {
  static get defaultProps() {
    return {
      delay: 1000,
      color: '#424242',
      type: 'spinningBubbles',
    };
  }

  constructor(props) {
    super(props);
    this.timer = -1;
    this.state = {
      waiting: true,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.setState({ waiting: false }), this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { waiting } = this.state;

    return waiting ? (
      <div />
    ) : (
      <div className={styles.base}>
        <ReactLoading {...this.props} delay={0} />
      </div>
    );
  }
}

export default withStyles(styles)(Loading);
