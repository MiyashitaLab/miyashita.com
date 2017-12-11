<style src="./News.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <NewsHeader :title="page.title" :src="page.thumbnail" :date="date" :blur="true" />
    <div :class="$style.content">
      <SocialButtonList :title="page.title" />
      <MarkdownContent :ast="page.content" />
    </div>
  </div>
</template>

<script>
import generateHead from '~/utils/generateHead';
import fetchData from '~/utils/fetchData';
import NewsHeader from '~/components/NewsHeader';
import SocialButtonList from '~/components/SocialButtonList';
import MarkdownContent from '~/components/MarkdownContent';

export default {
  head: generateHead,
  asyncData: fetchData,
  computed: {
    date() {
      return new Date(this.page.date);
    },
  },
  components: {
    NewsHeader,
    SocialButtonList,
    MarkdownContent,
  },
};
</script>
