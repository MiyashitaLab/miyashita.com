<style src="./SectionHeader.css" lang="postcss" module></style>

<template>
  <header>
    <h2 :class="$style.header">
      <span :class="$style.headerInner">
        <slot />
      </span>
      <Link v-if="href" :class="$style.moreLink" :href="href">
        <span>もっと見る</span>
        <FontAwesome name="angle-right" />
      </Link>
    </h2>
  </header>
</template>

<script>
export default {
  props: ['href'],
};
</script>
