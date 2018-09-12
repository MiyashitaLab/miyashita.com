import React from 'react';

const Document = ({ Html, Head, Body, children, renderMeta }) => (
  <Html lang="ja" dir="ltr">
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" />
      <style data-ssr dangerouslySetInnerHTML={{ __html: renderMeta.styles }} />
      <script async src="https://www.googletagmanager.com/gtag/js" />
    </Head>
    <Body>{children}</Body>
  </Html>
);

export default Document;
