<style src="./SocialButtonList.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <SocialButton :href="twitterUrl" color="#1DA1F2" text="Tweet" icon="twitter" />
    <SocialButton
      :href="facebookUrl"
      color="#3B5998"
      text="Share"
      icon="facebook-official"
    />
  </div>
</template>

<script>
import url from 'url';
import encodeUrl from 'encodeurl';
import SocialButton from './SocialButton';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    pageUrl() {
      return encodeUrl(url.resolve(process.env.baseUrl, this.$route.path));
    },
    pageTitle() {
      return `${this.title} | ${process.env.siteTitle}`;
    },
    twitterUrl() {
      const pageTitle = encodeURIComponent(this.pageTitle);
      const pageUrl = encodeURIComponent(this.pageUrl);
      return `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
    },
    facebookUrl() {
      const pageTitle = encodeURIComponent(this.pageTitle);
      const pageUrl = encodeURIComponent(this.pageUrl);
      return `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    },
  },
  components: {
    SocialButton,
  },
};
</script>

