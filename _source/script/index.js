const NOIMAGE_LINK = 'https://placehold.it/512x288?text=NO+IMAGE';

const newsVm = new Vue({
  el: '#news',
  data: () => ({
    newsList: new Array(10).fill({
      title: '',
      url: '#',
      date: '',
      image: '',
    }),
  }),
  created() {
    fetch('https://news.miyashita.com/atom.xml')
      .then((res) => res.text())
      .then((text) => (new DOMParser()).parseFromString(text, 'application/xml'))
      .then((rss) => {
        const _newsList = [];

        const entriesList = rss.querySelectorAll('entry');
        for (const entry of entriesList) {
          const content = (new DOMParser()).parseFromString(entry.querySelector('content').textContent, 'text/html');
          const imageEl = content.querySelector('img');
          const youtubeEl = content.querySelector('iframe[src*="youtube"]');
          const youtubeId = youtubeEl && youtubeEl.getAttribute('src').split('/').pop().match(/^(.*)(?:\?|$)/)[1];
          const imageSrc =
            (imageEl) ? imageEl.getAttribute('src') :
            (youtubeEl) ? `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg` : NOIMAGE_LINK;

          const news = {
            title: entry.querySelector('title').textContent,
            url: entry.querySelector('link').getAttribute('href'),
            date: moment(entry.querySelector('updated').textContent).format('YYYY/MM/DD'),
            image: (/^https?:/.test(imageSrc)) ? imageSrc : 'https://news.miyashita.com/' + imageSrc,
          };
          _newsList.push(news);
        }

        this.newsList = _newsList;
      })
      .catch((err) => console.error(err));
  },
});
