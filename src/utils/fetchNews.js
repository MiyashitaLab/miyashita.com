import axios from 'axios';

export default function fetchNews() {
  return axios
    .get('https://news.miyashita.com/atom.xml', {
      responseType: 'document',
    })
    .then(({ data: doc }) => {
      const entries = Array.from(doc.querySelectorAll('entry'));

      return entries.map(entry => ({
        id: entry.querySelector('id').textContent,
        title: entry.querySelector('title').textContent,
        published: new Date(entry.querySelector('published').textContent),
        thumbnail: extractThumbnailFromHTML(entry.querySelector('content').textContent),
        url: entry.querySelector('link').getAttribute('href'),
      }));
    });
}

function extractThumbnailFromHTML(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const img = doc.querySelector('img');
  if (!img || !img.getAttribute('src')) {
    return null;
  }
  return img.getAttribute('src');
}
