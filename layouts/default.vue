<style src="~/styles/global.css" lang="postcss"></style>
<style src="./default.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <header :class="$style.header">
      <PageNav />
    </header>
    <main :class="$style.main">
      <nuxt />
    </main>
    <footer :class="$style.footer">
      <PageFooter />
    </footer>
  </div>
</template>

<script>
import PageNav from '../components/PageNav';
import PageFooter from '../components/PageFooter';

export default {
  components: {
    PageNav,
    PageFooter,
  },
};
</script>
