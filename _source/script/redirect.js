const sush = new SUSH();

Promise.all([
  fetch('/redirect.json')
    .then((res) => res.json()).catch(() => Promise.resolve({})),
  fetch('https://news.miyashita.com/redirect.json')
    .then((res) => res.json()).catch(() => Promise.resolve({})),
])
.then((resList) => {
  const info = {};
  resList.forEach((res) => Object.assign(info, res));
  return sush.flow([
    ({ id, stock }) => ({
      id: location.search.match(/p=(\d+)/)[1].toString(10),
      stock,
    }),
    SUSH.$addObject(info),
    SUSH.$redirect({ fallback: '/404/' }),
  ]);
})
