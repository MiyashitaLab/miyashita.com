import libpath from 'path';
import pkgDir from 'pkg-dir';
import orderBy from 'lodash.orderby';
import getArticleList from './utils/getArticleList';

const rootDir = pkgDir.sync(__dirname);

const filePaths = {
  news: libpath.resolve(rootDir, './articles/news/**/*.md'),
  projects: libpath.resolve(rootDir, './articles/projects/**/*.md'),
  members: libpath.resolve(rootDir, './articles/members/**/*.md'),
  articles: libpath.resolve(rootDir, './articles/articles/**/*.md'),
};

/**
 *
 * @param {*[]} items
 * @param {number} pageSize
 * @param {object} route
 */
function makePageRoutes(items, pageSize, route) {
  const itemsCopy = [...items];
  const pages = [];
  const props = route.getData();

  while (itemsCopy.length) {
    pages.push(itemsCopy.splice(0, pageSize));
  }

  const maxCount = pages.length;
  const routes = [
    {
      ...route,
      path: `${route.path}`,
      getData: () => ({
        page: {
          ...props.page,
          items: pages[0],
          count: 1,
          maxCount,
          basePath: route.path,
        },
      }),
    },
    ...pages.map((page, i) => ({
      ...route,
      path: `${route.path}page/${i + 1}/`,
      getData: () => ({
        page: {
          ...props.page,
          items: page,
          count: i + 1,
          maxCount,
          basePath: route.path,
        },
      }),
    })),
  ];

  return routes;
}

async function getRoutes() {
  const newsList = await getArticleList(filePaths.news, {
    permalink: '/news/:year/:month/:day/:title/',
  });
  const projectList = await getArticleList(filePaths.projects, {
    permalink: '/projects/:title/',
  });
  const memberList = await getArticleList(filePaths.members, {
    permalink: '/members/:title/',
  });
  const othersList = await getArticleList(filePaths.articles);

  const projectCategories = Array.from(new Set(projectList.map(p => p.category)));
  const projectListGroupByCategories = {};

  for (const category of projectCategories) {
    projectListGroupByCategories[category] = projectList
      .filter(p => p.category === category)
      .map(i => ({
        ...i,
        date: undefined,
        content: undefined,
        filePath: undefined,
      }));
  }

  const currentMemberList = orderBy(
    memberList.filter(i => i.category !== '99_OB'),
    ['category', 'school_year', 'title'],
    ['asc', 'desc', 'asc'],
  ).map(i => ({ ...i, content: undefined, filePath: undefined }));

  const OBMemberList = orderBy(
    memberList.filter(i => i.category === '99_OB'),
    ['year_of_graduation', 'title'],
    ['desc', 'asc'],
  ).map(i => ({ ...i, content: undefined, filePath: undefined }));

  return [
    {
      path: '/',
      component: 'src/containers/Home',
      getData: () => ({
        page: {
          title: '',
          description:
            '明治大学 総合数理学部 先端メディアサイエンス学科 / 明治大学大学院 先端数理科学研究科 先端メディアサイエンス専攻 宮下研究室',
          news: newsList.slice(0, 8).map(i => ({ ...i, content: undefined, filePath: undefined })),
          projects: projectList
            .filter(i => i.visibleOnTopPage)
            .map(i => ({
              ...i,
              date: undefined,
              content: undefined,
              filepath: undefined,
            })),
          members: currentMemberList,
        },
      }),
    },
    ...makePageRoutes(newsList.map(i => ({ ...i, content: undefined, filePath: undefined })), 30, {
      path: '/news/',
      component: 'src/containers/NewsList',
      getData: () => ({
        page: {
          title: 'ニュース',
        },
      }),
    }),
    {
      path: '/members/',
      component: 'src/containers/MemberList',
      getData: () => ({
        page: {
          title: 'メンバー',
          currentMembers: currentMemberList,
          OBMembers: OBMemberList,
        },
      }),
    },
    {
      path: '/projects/',
      component: 'src/containers/ProjectList',
      getData: () => ({
        page: {
          title: 'プロジェクト',
          projectsGroupByCategories: projectListGroupByCategories,
        },
      }),
    },
    ...memberList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Member',
      getData: () => ({ page: info }),
    })),
    ...newsList.map(info => ({
      path: info.permalink,
      component: 'src/containers/News',
      getData: () => ({ page: info }),
    })),
    ...projectList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Article',
      getData: () => ({ page: info }),
    })),
    ...othersList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Article',
      getData: () => ({ page: info }),
    })),
    {
      path: '404',
      component: 'src/containers/NotFound',
      getData: () => ({ page: { title: '404 NotFound' } }),
    },
  ];
}

export default getRoutes;
