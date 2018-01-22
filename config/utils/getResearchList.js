import url from 'url';
import axios from 'axios';
import moment from 'moment';
import pathToRegexp from 'path-to-regexp';

async function fetchEntriesFromGSheet({ spreadID, sheetID }) {
  const { data: rawData } = await axios.request({
    method: 'GET',
    url: `https://spreadsheets.google.com/feeds/list/${spreadID}/${sheetID}/public/values?alt=json`,
  });

  const entries = rawData.feed.entry.slice(1).map(entry => {
    const keys = Object.keys(entry).filter(k => k.match(/^gsx\$/));
    const obj = {};
    keys.forEach(key => {
      const newKey = key.replace(/^gsx\$/, '').replace(/-/g, '_');
      obj[newKey] = entry[key].$t;

      switch (obj[newKey]) {
        case 'TRUE': {
          obj[newKey] = true;
          break;
        }
        case 'FALSE': {
          obj[newKey] = false;
          break;
        }
        default:
      }
    });
    return obj;
  });

  return entries;
}

export async function getResearchList() {
  const entries = await fetchEntriesFromGSheet({
    spreadID: '1n1Z_KQAOZ-ZQpCAHx_6YFoO0z_tKfSXXwdf_vZijOWk',
    sheetID: 'otu50x0',
  });

  return entries
    .filter(entry => !entry.draft)
    .map(entry => {
      const date = moment(entry.issued, ['YYYY/MM/DD', moment.ISO_8601]);
      return {
        id: entry.id,
        title: entry.title,
        thumbnail: entry.youtube_url || entry.thumbnail_url ? true : null,
        date: date.toDate(),
        year: date.year(),
        month: date.month() + 1,
        day: date.date(),
      };
    })
    .map(entry => ({
      ...entry,
      thumbnail:
        entry.thumbnail &&
        url.resolve(
          'https://research.miyashita.com/',
          decodeURIComponent(pathToRegexp.compile('/:year/:id/thumb.jpg')(entry))
        ),
      permalink: url.resolve(
        'https://research.miyashita.com/',
        decodeURIComponent(pathToRegexp.compile('/:year/:id/')(entry))
      ),
    }));
}

export default getResearchList;
