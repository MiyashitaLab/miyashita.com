<style src="./Home.css" lang="postcss" module></style>

<template>
  <div :class="$style.base">
    <HomeHeader />
    <div :class="$style.content">
      <section>
        <SectionHeader href="/news/">
          <FontAwesome name="newspaper-o" />
          <span>ニュース</span>
        </SectionHeader>
        <CardList :itemsLength="page.news.length">
          <template v-for="news in page.news">
            <ArticleCard :key="news.title" :item="news"></ArticleCard>
          </template>
          <ReadmoreCard href="/news/" />
        </CardList>
      </section>

      <section>
        <SectionHeader href="https://research.miyashita.com">
          <FontAwesome name="graduation-cap" />
          <span>論文データベース</span>
        </SectionHeader>
        <div :class="$style.researchInput">
          <SearchInput />
        </div>
        <CardList :itemsLength="page.researches.length">
          <template v-for="research in page.researches">
            <ArticleCard :key="research.id" :item="research"></ArticleCard>
          </template>
          <ReadmoreCard href="https://research.miyashita.com" />
        </CardList>
      </section>

      <section>
        <SectionHeader href="/projects/">
          <FontAwesome name="th" />
          <span>プロジェクト</span>
        </SectionHeader>
        <CardList :itemsLength="page.projects.length">
          <template v-for="project in page.projects">
            <ArticleCard :key="project.title" :item="project"></ArticleCard>
          </template>
          <ReadmoreCard href="/projects/" />
        </CardList>
      </section>

      <section>
        <SectionHeader href="/members/">
          <FontAwesome name="group" />
          <span>メンバー</span>
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
import ReadmoreCard from '~/components/ReadmoreCard';
import MemberCard from '~/components/MemberCard';
import SearchInput from '~/components/SearchInput';

export default {
  head: generateHead,
  asyncData: fetchData,
  components: {
    HomeHeader,
    SectionHeader,
    CardList,
    ArticleCard,
    ReadmoreCard,
    MemberCard,
    SearchInput,
  },
};
</script>
