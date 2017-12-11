<style src="./Home.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <HomeHeader />
    <div :class="$style.content">
      <section>
        <SectionHeader href="/news/">
          ニュース
        </SectionHeader>
        <CardList :itemsLength="page.news.length">
          <template v-for="news in page.news">
            <ArticleCard :key="news.title" :item="news"></ArticleCard>
          </template>
        </CardList>
      </section>

      <section>
        <SectionHeader href="/projects/">
          プロジェクト
        </SectionHeader>
        <CardList :itemsLength="page.projects.length">
          <template v-for="project in page.projects">
            <ArticleCard :key="project.title" :item="project"></ArticleCard>
          </template>
        </CardList>
      </section>

      <section>
        <SectionHeader href="/members/">
          メンバー
        </SectionHeader>
        <div :class="$style.memberList">
          <template v-for="member in page.members">
            <MemberCard :key="member.title" :info="member"></MemberCard>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import generateHead from '~/utils/generateHead';
import fetchData from '~/utils/fetchData';
import HomeHeader from '~/components/HomeHeader';
import SectionHeader from '~/components/SectionHeader';
import CardList from '~/components/CardList';
import ArticleCard from '~/components/ArticleCard';
import MemberCard from '~/components/MemberCard';

export default {
  head: generateHead,
  asyncData: fetchData,
  components: {
    HomeHeader,
    SectionHeader,
    CardList,
    ArticleCard,
    MemberCard,
  },
};
</script>
