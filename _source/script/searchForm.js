const searchVm = new Vue({
  el: '#search',
  data: () => ({
    researchLength: '000',
  }),
  computed: {
    placeholder() {
      return `論文データベース検索（${this.researchLength} 件）`
    },
  },
  created() {
    fetch('https://research.miyashita.com/sitemap.xml')
      .then((res) => res.text())
      .then((text) => (new DOMParser()).parseFromString(text, 'application/xml'))
      .then((xml) => {
        this.researchLength = xml.querySelectorAll('url').length - 1;
      })
      .catch((err) => console.error(err));
  },
});
