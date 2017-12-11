<style src="./NewsList.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <ArticleHeader title="ニュース" :src="headerImage" />
    <div :class="$style.content">
      <section :class="$style.section">
        <div :class="$style.newsList">
          <template v-for="item in page.items">
            <ArticleCard :key="item.title" :wide="true" :item="item" />
          </template>
        </div>
      </section>
      <Pagination :current="page.count" :maxCount="page.maxCount" :basePath="page.basePath" />
    </div>
  </div>
</template>

<script>
import generateHead from '~/utils/generateHead';
import fetchData from '~/utils/fetchData';
import ArticleHeader from '~/components/ArticleHeader';
import ArticleCard from '~/components/ArticleCard';
import Pagination from '~/components/Pagination';

export default {
  data: () => ({
    headerImage: '',
  }),
  head: generateHead,
  asyncData: fetchData,
  components: {
    ArticleHeader,
    ArticleCard,
    Pagination,
  },
};
</script>
