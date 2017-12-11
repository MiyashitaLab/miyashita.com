<style src="./ProjectList.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <ArticleHeader title="プロジェクト" :src="headerImage" />
    <div :class="$style.content">
      <section :class="$style.section">
        <SectionHeader>
          受賞・助成
        </SectionHeader>
        <p :class="$style.linkList">
          <Link href="/awards/" :class="$style.link">受賞歴</Link>
          <span>・</span>
          <Link href="/grants/" :class="$style.link">助成一覧</Link>
        </p>
      </section>
      <template v-for="category in categories">
        <section :key="category.title" :class="$style.section">
          <SectionHeader>
            {{category.title}}
          </SectionHeader>
          <div :class="$style.projectList">
            <template v-for="item in category.items">
              <ArticleCard :key="item.title" :wide="true" :item="item" />
            </template>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import generateHead from '~/utils/generateHead';
import fetchData from '~/utils/fetchData';
import ArticleHeader from '~/components/ArticleHeader';
import SectionHeader from '~/components/SectionHeader';
import ArticleCard from '~/components/ArticleCard';

export default {
  data: () => ({
    headerImage: '',
  }),
  head: generateHead,
  asyncData: fetchData,
  computed: {
    categories() {
      const { projectsGroupByCategories } = this.page;
      const categoryNameList = Object.keys(projectsGroupByCategories).sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
      return categoryNameList.map(title => ({
        title,
        items: projectsGroupByCategories[title],
      }));
    },
  },
  components: {
    ArticleHeader,
    SectionHeader,
    ArticleCard,
  },
};
</script>
