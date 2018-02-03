import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { AppContainer } from 'react-hot-loader';
import WithStylesContext from './lib/WithStylesContext';

import App from './App';
export default App;

if (typeof document !== 'undefined') {
  // Cache by ServiceWorker
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }

  // Google Analytics
  ReactGA.initialize('UA-25034793-2');

  // Intersection Observer Polyfill
  require('intersection-observer');

  const render = Comp => {
    const App = (
      <AppContainer>
        <WithStylesContext onInsertCss={styles => styles._insertCss()}>
          <Comp />
        </WithStylesContext>
      </AppContainer>
    );

    if (process.env.NODE_ENV !== 'production') {
      ReactDOM.render(App, document.getElementById('root'));
    } else {
      ReactDOM.hydrate(App, document.getElementById('root'));
    }
  };

  render(App);

  if (module.hot) {
    module.hot.accept('./App', () => {
      render(require('./App').default);
    });
  }
}
