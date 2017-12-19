import url from 'url';
import encodeUrl from 'encodeurl';

export default function generateHead() {
  const title = this.page.title ? `${this.page.title} | ${process.env.siteTitle}` : process.env.siteTitle;
  const href = encodeUrl(url.resolve(process.env.baseUrl, this.$route.path));
  return {
    title: title,
    meta: [
      { name: 'description', content: this.page.description },
      // OGP
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:url', content: href },
      { property: 'og:image', content: this.page.thumbnail },
      { property: 'og:description', content: this.page.description },
      { property: 'og:site_name', content: process.env.siteTitle },
      { property: 'og:locale', content: 'ja_JP' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: process.env.twitterAccount },
      { name: 'twitter:url', content: href },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: this.page.description },
      { name: 'twitter:image', content: this.page.thumbnail },
    ],
    link: [{ rel: 'canonical', href: href }],
  };
}
