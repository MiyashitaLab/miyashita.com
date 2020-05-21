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
      imageUrl: optimized,
      src:
        // (props.options.progressive && getProgressiveImage(optimized, false)) ||
        // (props.options.lazyload && emptyImage) ||
        optimized,
      loaded: false,
    };
  }

  onVisibleChange = ({ isIntersecting }, unobserve) => {
    if (isIntersecting && !this.state.loaded) {
      this.loadImage();
      unobserve();
    }
  };

  loadImage = async () => {
    const img = new Image();
    const imageUrl = (await supportsWebP) ? getWebpImage(this.state.imageUrl) : this.state.imageUrl;
    console.log(imageUrl);
    img.addEventListener('load', () => {
      this.setState({ src: imageUrl, loaded: true });
    });
    img.addEventListener('error', _err => {
      this.setState({ src: this.props.fallback || emptyImage, loaded: true });
    });
    img.setAttribute('src', imageUrl);
  };

  render() {
    const imageProps = Object.assign({}, this.props, {
      options: undefined,
      width: undefined,
      height: undefined,
    });
    return (
      <Observer onChange={this.onVisibleChange}>
        <img {...imageProps} alt={this.props.alt || ''} src={this.state.src} />
      </Observer>
    );
  }
}

export default OptimizedImage;
