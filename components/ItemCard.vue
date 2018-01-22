<style src="./ItemCard.css" lang="postcss" module></style>

<template>
  <div :class="{
    [$style.itemWrapper]: true,
    [$style.wide]: wide,
  }">
    <div :class="$style.item">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
