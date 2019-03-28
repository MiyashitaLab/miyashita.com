import React from 'react';
import Observer from '@researchgate/react-intersection-observer';
import url from 'url';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './AwesomeIframe.css';
import OptimizedImage from '~/components/OptimizedImage';

class AwesomeIframe extends React.Component {
  state = {
    src: '',
    thumbnail: '',
    visible: false,
  };

  componentDidMount() {
    this.setOptimizedSrc(this.props.src);
  }

  componentWillReceiveProps(props) {
    this.setOptimizedSrc(props.src);
  }

  setOptimizedSrc(origin) {
    if (/youtube\.com/.test(origin)) {
      const parsed = url.parse(origin, true);
      const videoId = parsed.pathname.split('/').pop();
      Object.assign(parsed.query, {
        rel: 0,
        showinfo: 1,
        autohide: 1,
        playsinline: 1,
        fs: 1,
      });
      return this.setState({
        src: url.format(parsed),
        thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
      });
    }
    return this.setState({ src: origin });
  }

  onVisibleChange = ({ isIntersecting }, unobserve) => {
    this.setState(({ visible }) => ({ visible: visible || !!isIntersecting }));
    unobserve();
  };

  render() {
    const { src, thumbnail, visible } = this.state;
    const iframeProps = Object.assign({}, this.props, {
      src,
      width: undefined,
      height: undefined,
    });

    return (
      <Observer onChange={this.onVisibleChange}>
        <div className={styles.base}>
          <div className={styles.wrapper}>
            {thumbnail && (
              <OptimizedImage
                className={styles.thumbnail}
                src={thumbnail}
                alt="video_thumbnail"
                options={{ lazyload: false }}
              />
            )}
            {visible && (
              <iframe {...iframeProps} className={styles.iframe} frameBorder="0" allowFullscreen />
            )}
          </div>
        </div>
      </Observer>
    );
  }
}

export default withStyles(styles)(AwesomeIframe);
