<style src="./AutoTextWrap.css" lang="postcss" module></style>

<template>
  <span>
    <template v-for="(word, idx) in words">
      <span :key="idx" role="presentation" :class="$style.word">{{word}}</span>
    </template>
  </span>
</template>

<script>
import Mikan from 'mikanjs';

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    words() {
      return Mikan.split(this.text);
    },
  },
};
</script>
