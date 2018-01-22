<template>
  <component :is="tag" v-observe-visibility="this.visibleListener" :to="href" :href="href" rel="noopener noreferrer">
    <slot/>
  </component>
</template>

<script>
import fetchData from '~/utils/fetchData';

export default {
  data: () => ({
    preloaded: false,
  }),
  props: ['href'],
  computed: {
    tag() {
      return /^[a-z][a-z0-9+.-]*:/.test(this.href) ? 'a' : 'nuxt-link';
    },
  },
  methods: {
    visibleListener(isVisible) {
      if (isVisible && !this.preloaded) {
        this.preloadData();
      }
    },
    preloadData() {
      if (/^[a-z][a-z0-9+.-]*:/.test(this.href)) {
        return false;
      }
      fetchData({ route: { path: this.href } })
        .catch(err => {
          console.error(err);
          return Promise.resolve;
        })
        .then(() => {
          this.preloaded = true;
        });
    },
  },
};
</script>
