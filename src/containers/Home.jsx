import React from 'react';
import { withRouteData } from 'react-static';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Home.css';
import withTracker from '~/lib/withTracker';
import withMetadata from '~/lib/withMetadata';
import HomeHeader from '~/components/HomeHeader';
import FontAwesome from '~/components/FontAwesome';
import SectionHeader from '~/components/SectionHeader';
import CardList from '~/components/CardList';
import ArticleCard from '~/components/ArticleCard';
import MemberCard from '~/components/MemberCard';
import ReadmoreCard from '~/components/ReadmoreCard';
import SearchInput from '~/components/SearchInput';

const Home = ({ page }) => (
  <div className={styles.base}>
    <HomeHeader />
    <div className={styles.content}>
      <section>
        <SectionHeader>
          <FontAwesome name="newspaper-o" />
          <span>ニュース</span>
        </SectionHeader>
        <CardList>
          {page.news.map(news => <ArticleCard key={news.title} item={news} />)}
          <ReadmoreCard href="/news/" />
        </CardList>
      </section>

      <hr className={styles.hr} />

      <section>
        <SectionHeader href="https://research.miyashita.com">
          <FontAwesome name="graduation-cap" />
          <span>論文データベース</span>
        </SectionHeader>
        <div className={styles.researchInput}>
          <SearchInput />
        </div>
        <CardList>
          {page.researches.map(research => <ArticleCard key={research.id} item={research} />)}
          <ReadmoreCard href="https://research.miyashita.com" />
        </CardList>
      </section>

      <hr className={styles.hr} />

      <section>
        <SectionHeader href="/projects/">
          <FontAwesome name="th" />
          <span>プロジェクト</span>
        </SectionHeader>
        <CardList itemsLength={page.projects.length}>
          {page.projects.map(project => <ArticleCard key={project.title} item={project} />)}
          <ReadmoreCard href="/projects/" />
        </CardList>
      </section>

      <hr className={styles.hr} />

      <section>
        <SectionHeader href="/members/">
          <FontAwesome name="group" />
          <span>メンバー</span>
        </SectionHeader>
        <div className={styles.memberList}>
          {page.members.map(member => <MemberCard key={member.title} info={member} />)}
        </div>
      </section>
    </div>
  </div>
);

export default withTracker(withMetadata(withRouteData(withStyles(styles)(Home))));
