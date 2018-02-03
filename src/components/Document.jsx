import React from 'react';

const Document = ({ Html, Head, Body, children, renderMeta }) => (
  <Html lang="ja" dir="ltr">
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style data-ssr dangerouslySetInnerHTML={{ __html: renderMeta.styles }} />
    </Head>
    <Body>{children}</Body>
  </Html>
);

export default Document;
