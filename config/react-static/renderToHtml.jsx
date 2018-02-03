import React from 'react';
import WithStylesContext from '../../src/lib/WithStylesContext';

const renderToHtml = (render, Component, meta) => {
  const css = new Set();
  const markup = render(
    <WithStylesContext onInsertCss={styles => css.add(styles._getCss())}>
      <Component />
    </WithStylesContext>,
  );
  meta.styles = [...css].join('');
  return markup;
};
export default renderToHtml;
