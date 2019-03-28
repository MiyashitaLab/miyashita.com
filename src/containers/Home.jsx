import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './Home.css';
import withTracker from '~/lib/withTracker';
import withMetadata from '~/lib/withMetadata';
import withRouteData from '~/lib/withRouteData';
import HomeHeader from '~/components/HomeHeader';
import FontAwesome from '~/components/FontAwesome';
import SectionHeader from '~/components/SectionHeader';
import CardList from '~/components/CardList';
import ArticleCard from '~/components/ArticleCard';
import ResearchCardList from '~/components/ResearchCardList';
import MemberCard from '~/components/MemberCard';
import ReadmoreCard from '~/components/ReadmoreCard';
import Link from '~/components/Link';

const Home = ({ page }) => (
  <div className={styles.base}>
    <HomeHeader />
    <div className={styles.content}>
      <section>
        <SectionHeader href="/news/">
          <FontAwesome name="newspaper-o" />
          <span>ニュース</span>
        </SectionHeader>
        <CardList>
          {page.news.map(news => (
            <ArticleCard key={news.title} item={news} />
          ))}
          <ReadmoreCard href="/news/" />
        </CardList>
      </section>

      <hr className={styles.hr} />

      <section>
        <SectionHeader href="https://research.miyashita.com">
          <FontAwesome name="graduation-cap" />
          <span>論文データベース</span>
        </SectionHeader>
        <ResearchCardList />
      </section>

      <hr className={styles.hr} />

      <section>
        <SectionHeader href="/projects/">
          <FontAwesome name="th" />
          <span>プロジェクト</span>
        </SectionHeader>
        <CardList itemsLength={page.projects.length}>
          {page.projects.map(project => (
            <ArticleCard key={project.title} item={project} />
          ))}
          <ReadmoreCard href="/projects/" />
        </CardList>
      </section>

      <hr className={styles.hr} />

      <section>
        <SectionHeader href="/members/">
          <FontAwesome name="group" />
          <span>メンバー</span>
        </SectionHeader>
        <p className={styles.readMoreWrapper}>
          <Link className={styles.readMore} href="/members/">
            <span>歴代の宮下研メンバーはこちら</span>
            <FontAwesome name="angle-right" />
          </Link>
        </p>
        <div className={styles.memberList}>
          {page.members.map(member => (
            <MemberCard key={member.title} info={member} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default withTracker(withMetadata(withRouteData(withStyles(styles)(Home))));
