import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import App from './App';
export default App;

if (typeof document !== 'undefined') {
  // Cache by ServiceWorker
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }

  // Intersection Observer Polyfill
  require('intersection-observer');

  const render = Comp => {
    const App = (
      <AppContainer>
        <StyleContext.Provider
          value={{ insertCss: (...styles) => styles.forEach(s => s._insertCss()) }}
        >
          <Comp />
        </StyleContext.Provider>
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
