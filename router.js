import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: () => import('~/containers/Home').then(m => m.default || m),
  },
  {
    path: '/news/',
    component: () => import('~/containers/NewsList').then(m => m.default || m),
  },
  {
    path: '/news/page/:id/',
    component: () => import('~/containers/NewsList').then(m => m.default || m),
  },
  {
    path: '/news/:year/:month/:day/:title/',
    component: () => import('~/containers/News').then(m => m.default || m),
  },
  {
    path: '/members/',
    component: () => import('~/containers/MemberList').then(m => m.default || m),
  },
  {
    path: '/members/:member/',
    component: () => import('~/containers/Member').then(m => m.default || m),
  },
  {
    path: '/projects/',
    component: () => import('~/containers/ProjectList').then(m => m.default || m),
  },
  {
    path: '/projects/:project/',
    component: () => import('~/containers/Article').then(m => m.default || m),
  },
  {
    path: '/awards/',
    component: () => import('~/containers/Article').then(m => m.default || m),
  },
  {
    path: '/grants/',
    component: () => import('~/containers/Article').then(m => m.default || m),
  },
  {
    path: '/ipsj/',
    component: () => import('~/containers/Article').then(m => m.default || m),
  },
];

export function createRouter() {
  return new Router({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
      return new Promise(resolve => {
        setTimeout(() => {
          if (savedPosition) {
            return resolve(savedPosition);
          } else if (to.hash) {
            return resolve({ selector: to.hash });
          } else {
            return resolve({ x: 0, y: 0 });
          }
        }, 450);
      });
    },
  });
}
