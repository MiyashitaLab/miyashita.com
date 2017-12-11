<style src="./Member.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <div :class="$style.imageWrapper">
      <FaceImage :src="page.avatar" size="200" />
    </div>
    <div :class="$style.content">
      <h1>{{page.title}}</h1>
      <SocialButtonList :title="page.title" />
      <MarkdownContent :ast="page.content" />
    </div>
  </div>
</template>

<script>
import generateHead from '~/utils/generateHead';
import fetchData from '~/utils/fetchData';
import FaceImage from '~/components/FaceImage';
import SocialButtonList from '~/components/SocialButtonList';
import MarkdownContent from '~/components/MarkdownContent';

export default {
  head: generateHead,
  asyncData: fetchData,
  components: {
    FaceImage,
    SocialButtonList,
    MarkdownContent,
  },
};
</script>
