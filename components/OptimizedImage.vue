<template>
  <img v-observe-visibility="this.visibleListener" :src="loadedSrc || progressiveUrl" alt="" />
</template>

<script>
import supportsWebP from 'supports-webp';
import { getProgressiveImage, getOptimizedImage, getWebpImage } from '~/utils/imageUrl';

const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export default {
  data: () => ({
    loadedSrc: null,
  }),
  props: {
    src: {
      type: String,
      require: true,
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    progressive: {
      type: Boolean,
      default: true,
    },
    lazyload: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    optimizedUrl() {
      return getOptimizedImage(this.src, this.width, this.height);
    },
    progressiveUrl() {
      return this.progressive ? getProgressiveImage(this.optimizedUrl, false) || emptyImage : emptyImage;
    },
    imageUrl() {
      return (supportsWebP && getWebpImage(this.optimizedUrl)) || this.optimizedUrl;
    },
  },
  mounted() {
    if (!this.lazyload) {
      this.loadedSrc = this.imageUrl;
    }
    if (!this.src) {
      this.loadedSrc = emptyImage;
    }
  },
  methods: {
    visibleListener(isVisible) {
      if (isVisible && !this.loadedSrc) {
        this.loadImage();
      }
    },
    loadImage() {
      const img = new Image();
      img.addEventListener('load', () => {
        this.loadedSrc = this.imageUrl;
      });
      img.addEventListener('error', err => {
        console.error(err);
        this.loadedSrc = emptyImage;
      });
      img.setAttribute('src', this.imageUrl);
    },
  },
};
</script>
