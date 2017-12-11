<style src="./NewsHeader.css" lang="postcss" module></style>

<template>
  <div :class="$style.header">
    <div :class="$style.imageWrapper">
      <OptimizedImage :class="$style.image" :src="src" :alt="title" />
    </div>
    <div :class="$style.textWrapper">
      <h1>
        <AutoTextWrap :text="title" />
      </h1>
      <p :class="$style.date">
        <time :datetime="date.toISOString()">{{dateText}}</time>
      </p>
    </div>
  </div>
</template>

<script>
import tinytime from 'tinytime';
import AutoTextWrap from './AutoTextWrap';

const dateTemplate = tinytime('{YYYY}/{Mo}/{DD}', {
  padMonth: true,
  padDays: true,
});

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    dateText() {
      return this.date && dateTemplate.render(this.date);
    },
  },
  components: {
    AutoTextWrap,
  },
};
</script>
