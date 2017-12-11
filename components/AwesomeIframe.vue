<style src="./AwesomeIframe.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <div v-observe-visibility="this.visibleListener" :class="$style.wrapper">
      <OptimizedImage v-if="optimized.thumbnail" :class="$style.thumbnail" :src="optimized.thumbnail" :lazyload="false" alt="video_thumbnail" />
      <iframe v-if="alreadyShown" :src="optimized.src" :class="$style.iframe" frameBorder="0" />
    </div>
  </div>
</template>

<script>
import url from 'url';

export default {
  data: () => ({
    alreadyShown: false,
  }),
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  computed: {
    optimized() {
      const origin = this.src;
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
        return {
          src: url.format(parsed),
          thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        };
      }
      return { src: origin };
    },
  },
  methods: {
    visibleListener(isVisible) {
      if (isVisible) {
        this.alreadyShown = true;
      }
    },
  },
};
</script>
