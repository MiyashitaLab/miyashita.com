const searchVm = new Vue({
  el: '#search',
  data: () => ({
    researchLength: '000',
  }),
  computed: {
    placeholder() {
      return `論文データベース検索（${this.researchLength} 件）`;
    },
  },
  created() {
    fetch('https://research.miyashita.com/sitemap.xml')
      .then(res => res.text())
      .then(text => new DOMParser().parseFromString(text, 'application/xml'))
      .then(xml => {
        const urlList = [...xml.querySelectorAll('url')].map(
          el => el.textContent
        );
        this.researchLength = urlList.filter(url =>
          url.match(/\/[A-Z]\d+\/$/)
        ).length;
      })
      .catch(err => console.error(err));
  },
});
