import React from 'react';
import { createBrowserRouter, HttpError, createRender } from 'found';
import ExecutionEnvironment from 'exenv';
import axios from 'axios';

import Transition from './components/Transition';
import Loading from './components/Loading';

import Base from './pages/_base';
import Index from './pages/index';
import RedirectIndex from './pages/redirect';
import MembersIndex from './pages/members';
import ProjectsIndex from './pages/projects';
import MemberLayout from './pages/_layouts/member';
import ProjectLayout from './pages/_layouts/project';
import NotFound from './pages/404';

const isServer = !ExecutionEnvironment.canUseDOM;

const mockJekyllData = () => ({
  page: new Proxy({}, { get: (_target, name) => `{{ page.${name} }}` }),
});

function getData({ location }) {
  return Promise.resolve()
    .then(() => {
      if (isServer) {
        return mockJekyllData();
      }
      const data = extractData(document);
      if (data) {
        return data;
      }

      return axios.get(location.pathname, { responseType: 'document' }).then(({ data: doc }) => {
        const data = extractData(doc);
        if (!data) {
          throw new HttpError(404);
        }
        return data;
      });
    })
    .catch(err => {
      console.error(err.stack || err);
      throw new HttpError((err.response && err.response.status) || err.status || 404);
    });
}

function extractData(doc) {
  const dataContainer = doc.querySelector('script[id="jekyll-data"]');
  if (dataContainer) {
    const data = JSON.parse(dataContainer.textContent);
    dataContainer.remove();
    return data;
  }
  return false;
}

function render({ Component, props, match }) {
  return Component && props ? (
    <Transition key={match.location.key}>
      <Component {...props} />
    </Transition>
  ) : (
    <Transition key="loading">
      <Loading />
    </Transition>
  );
}

const routeConfig = [
  {
    path: '/',
    Component: Base,
    children: [
      {
        Component: Index,
        getData,
        render,
      },
      {
        path: 'members/:id/',
        Component: MemberLayout,
        getData,
        render,
      },
      {
        path: 'members/',
        Component: MembersIndex,
        getData,
        render,
      },
      {
        path: 'projects/:id/',
        Component: ProjectLayout,
        getData,
        render,
      },
      {
        path: 'projects/',
        Component: ProjectsIndex,
        getData,
        render,
      },
      {
        path: 'redirect/',
        Component: RedirectIndex,
        getData,
        render,
      },
    ],
  },
];

export default {
  routeConfig,
  render: createRender({
    renderError: ({ _error }) => <NotFound />,
  }),
};
