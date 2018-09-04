import React from 'react';
import Observer from '@researchgate/react-intersection-observer';
import supportsWebP from 'supports-webp';
import { getProgressiveImage, getOptimizedImage, getWebpImage } from '~/lib/imageUrl';

const emptyImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

class OptimizedImage extends React.Component {
  static defaultProps = {
    options: {
      progressive: true,
      lazyload: true,
    },
  };

  constructor(props) {
    super(props);
    this.state = this.generateState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState(this.generateState(nextProps));
    }
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (!this.state.loaded) {
      this.loadImage();
    }
  }

  generateState(props) {
    const optimized = getOptimizedImage(props.src, props.width, props.height);

    return {
      imageUrl: (supportsWebP && getWebpImage(optimized)) || optimized,
      src:
        (props.options.progressive && getProgressiveImage(optimized, false)) ||
        (props.options.lazyload && emptyImage) ||
        optimized,
      loaded: false,
    };
  }

  onVisibleChange = ({ isIntersecting }) => {
    if (isIntersecting && !this.state.loaded) {
      this.loadImage();
    }
  };

  loadImage = () => {
    const img = new Image();
    img.addEventListener('load', () => {
      this.setState(state => ({ src: state.imageUrl, loaded: true }));
    });
    img.addEventListener('error', _err => {
      this.setState({ src: emptyImage, loaded: true });
    });
    img.setAttribute('src', this.state.imageUrl);
  };

  render() {
    const imageProps = Object.assign({}, this.props, {
      options: undefined,
      width: undefined,
      height: undefined,
    });
    return (
      <Observer onlyOnce={true} onChange={this.onVisibleChange}>
        <img {...imageProps} alt={this.props.alt || ''} src={this.state.src} />
      </Observer>
    );
  }
}

export default OptimizedImage;
