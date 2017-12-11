<style src="./Article.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <ArticleHeader :title="page.title" :src="page.thumbnail" :blur="true" />
    <div :class="$style.content">
      <SocialButtonList :title="page.title" />
      <MarkdownContent :ast="page.content" />
    </div>
  </div>
</template>

<script>
import generateHead from '~/utils/generateHead';
import fetchData from '~/utils/fetchData';
import ArticleHeader from '~/components/ArticleHeader';
import SocialButtonList from '~/components/SocialButtonList';
import MarkdownContent from '~/components/MarkdownContent';

export default {
  head: generateHead,
  asyncData: fetchData,
  components: {
    ArticleHeader,
    SocialButtonList,
    MarkdownContent,
  },
};
</script>
