import React from 'react';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import webpack from './config/react-static/webpack.config';

export default _pluginOptions => ({
  webpack,
  beforeRenderToHtml: (element, { meta }) => {
    meta.styles = new Set();
    return (
      <StyleContext.Provider
        value={{ insertCss: (...styles) => styles.forEach(s => meta.styles.add(s._getCss())) }}
      >
        {element}
      </StyleContext.Provider>
    );
  },
  Head: ({ meta }) => (
    <style data-ssr dangerouslySetInnerHTML={{ __html: [...meta.styles].join('') }} />
  ),
});
