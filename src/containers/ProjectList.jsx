import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './ProjectList.css';
import withTracker from '~/lib/withTracker';
import withMetadata from '~/lib/withMetadata';
import withRouteData from '~/lib/withRouteData';
import ArticleHeader from '~/components/ArticleHeader';
import ArticleCard from '~/components/ArticleCard';
import SectionHeader from '~/components/SectionHeader';
import Link from '~/components/Link';

function separateByCategories(page) {
  const { projectsGroupByCategories } = page;
  const categoryNameList = Object.keys(projectsGroupByCategories).sort(
    (a, b) => a.charCodeAt(0) - b.charCodeAt(0),
  );
  return categoryNameList.map(title => ({
    title,
    items: projectsGroupByCategories[title],
  }));
}

const ProjectList = ({ page }) => {
  const categories = separateByCategories(page);

  return (
    <div className={styles.base}>
      <ArticleHeader title="プロジェクト" src={''} />

      <div className={styles.content}>
        <section className={styles.section}>
          <SectionHeader>受賞・助成</SectionHeader>
          <p className={styles.linkList}>
            <Link href="/awards/" className={styles.link}>
              受賞歴
            </Link>
            <span>・</span>
            <Link href="/grants/" className={styles.link}>
              助成一覧
            </Link>
          </p>
        </section>

        {categories.map(category => (
          <section key={category.title} className={styles.section}>
            <SectionHeader>{category.title}</SectionHeader>
            <div className={styles.projectList}>
              {category.items.map(item => (
                <ArticleCard key={item.title} wide={true} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default withTracker(withMetadata(withRouteData(withStyles(styles)(ProjectList))));
