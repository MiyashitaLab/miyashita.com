<style src="./CardList.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <div :class="$style.outer">
      <div
        :class="{
          [$style.inner]: true,
          [$style.innerWrap]: wrap,
        }"
      >
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wrap: { type: Boolean, default: false },
    itemsLength: { type: Number, required: true },
  },
};
</script>
