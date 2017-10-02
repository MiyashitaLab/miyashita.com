import React from 'react';
import ReactLoading from 'react-loading';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Loading.css';

class Loading extends React.Component {
  static get defaultProps() {
    return { wait: 1000 };
  }

  constructor(props) {
    super(props);
    this.timer = -1;
    this.state = {
      waiting: true,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.setState({ waiting: false }), this.props.wait);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
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
