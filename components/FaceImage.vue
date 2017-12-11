<style src="./FaceImage.css" lang="postcss" module></style>

<template>
  <div :class="$style.base" :style="{ width: size && `${size}px`, height: size && `${size}px` }">
    <div :class="$style.imagePadding" />
    <OptimizedImage :class="$style.image" :src="src" :width="size" :height="size" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
    },
  },
};
</script>

