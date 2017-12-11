<style src="./ArticleHeader.css" lang="postcss" module></style>

<template>
  <div :class="$style.header">
    <div :class="$style.headerWrapper">
      <div :class="$style.bgImageWrapper">
        <OptimizedImage :class="$style.bgImage" :src="src" height="320" />
      </div>
      <div :class="{
        [$style.imageWrapper]: true,
        [$style.headerBlur]: this.blur,
      }">
        <OptimizedImage :class="$style.image" :src="src" height="320" />
      </div>
      <div :class="$style.headerCover">
        <div :class="$style.titleWrapper">
          <h1 :class="$style.title">
            <p :class="$style.border">
              <AutoTextWrap :text="title" />
            </p>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AutoTextWrap from './AutoTextWrap';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    blur: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AutoTextWrap,
  },
};
</script>
