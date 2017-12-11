<style src="./SocialButton.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <Link :class="$style.button" :href="href" :style="{ backgroundColor: color }">
      <FontAwesome :class="$style.icon" :name="icon" />
      <span>{{text}}</span>
    </Link>
  </div>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
