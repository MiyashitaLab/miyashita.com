import path from 'path';
import orderBy from 'lodash.orderby';
import getArticleList from './utils/getArticleList';

const filePaths = {
  news: path.resolve(__dirname, '../articles/news/**/*.md'),
  projects: path.resolve(__dirname, '../articles/projects/**/*.md'),
  members: path.resolve(__dirname, '../articles/members/**/*.md'),
  articles: path.resolve(__dirname, '../articles/articles/**/*.md'),
};

function makePageRoutes(items, pageSize, route) {
  const itemsCopy = [...items];
  const pages = [];
  const props = route.getProps();

  while (itemsCopy.length) {
    pages.push(itemsCopy.splice(0, pageSize));
  }

  const maxCount = pages.length;
  const routes = [
    {
      ...route,
      path: `${route.path}`,
      getProps: () => ({
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
      getProps: () => ({
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
  const memberList = await getArticleList(filePaths.members, { permalink: '/members/:title/' });
  const othersList = await getArticleList(filePaths.articles);

  const projectCategories = Array.from(new Set(projectList.map(p => p.category)));
  const projectListGroupByCategories = {};

  for (const category of projectCategories) {
    projectListGroupByCategories[category] = projectList
      .filter(p => p.category === category)
      .map(i => ({ ...i, date: undefined, content: undefined, filePath: undefined }));
  }

  const currentMemberList = orderBy(
    memberList.filter(i => i.category !== '99_OB'),
    ['category', 'school_year', 'title'],
    ['asc', 'desc', 'asc']
  ).map(i => ({ ...i, content: undefined, filePath: undefined }));

  const OBMemberList = orderBy(
    memberList.filter(i => i.category === '99_OB'),
    ['year_of_graduation', 'title'],
    ['desc', 'asc']
  ).map(i => ({ ...i, content: undefined, filePath: undefined }));

  return [
    {
      path: '/',
      component: '~/containers/Home',
      getProps: () => ({
        page: {
          title: '',
          description:
            '明治大学 総合数理学部 先端メディアサイエンス学科 / 明治大学大学院 先端数理科学研究科 先端メディアサイエンス専攻 宮下研究室',
          news: newsList.slice(0, 9).map(i => ({ ...i, content: undefined, filePath: undefined })),
          projects: projectList
            .filter(i => i.visibleOnTopPage)
            .map(i => ({ ...i, date: undefined, content: undefined, filePath: undefined })),
          members: currentMemberList,
        },
      }),
    },
    ...makePageRoutes(newsList.map(i => ({ ...i, content: undefined, filePath: undefined })), 30, {
      path: '/news/',
      component: '~/containers/NewsList',
      getProps: () => ({
        page: {
          title: 'ニュース',
        },
      }),
    }),
    {
      path: '/members/',
      component: '~/containers/MemberList',
      getProps: () => ({
        page: {
          title: 'メンバー',
          currentMembers: currentMemberList,
          OBMembers: OBMemberList,
        },
      }),
    },
    {
      path: '/projects/',
      component: '~/containers/ProjectList',
      getProps: () => ({
        page: {
          title: 'プロジェクト',
          projectsGroupByCategories: projectListGroupByCategories,
        },
      }),
    },
    ...memberList.map(info => ({
      path: info.permalink,
      component: '~/containers/Member',
      getProps: () => ({ page: info }),
    })),
    ...newsList.map(info => ({
      path: info.permalink,
      component: '~/containers/News',
      getProps: () => ({ page: info }),
    })),
    ...projectList.map(info => ({
      path: info.permalink,
      component: '~/containers/Article',
      getProps: () => ({ page: info }),
    })),
    ...othersList.map(info => ({
      path: info.permalink,
      component: '~/containers/Article',
      getProps: () => ({ page: info }),
    })),
    {
      is404: true,
      component: '~/containers/NotFound',
    },
  ];
}

export default getRoutes;
