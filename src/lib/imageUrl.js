import url from 'url';

class GPhotosUrl {
  static getOptimized(src, width, height) {
    const { baseUrl, params, legacy } = GPhotosUrl.parseUrl(src);
    Object.assign(params, {
      s: params.w || params.h ? null : params.s,
      w: width || params.w,
      h: height || params.h,
    });
    return GPhotosUrl.generateUrl({ baseUrl, params, legacy });
  }

  static getProgressive(src, webp) {
    const { baseUrl, params, legacy } = GPhotosUrl.parseUrl(src);
    Object.assign(params, {
      w: null,
      h: null,
      s: '50',
      f: 'Soften=1,30,0',
      rw: !!webp,
    });
    return GPhotosUrl.generateUrl({ baseUrl, params, legacy });
  }

  static getWebp(src) {
    const { baseUrl, params, legacy } = GPhotosUrl.parseUrl(src);
    return GPhotosUrl.generateUrl({
      baseUrl,
      params: { ...params, rw: true },
      legacy,
    });
  }

  static parseUrl(src) {
    const parsed = url.parse(src);
    const path = parsed.pathname.split('/').slice(1);
    const result = {};
    result.legacy = path.length !== 1;
    result.baseUrl = url.format({
      ...parsed,
      query: {},
      search: undefined,
      pathname: result.legacy ? `/${path.slice(0, 4).join('/')}` : parsed.pathname.split('=')[0],
    });
    result.params = GPhotosUrl.parseParams(
      !result.legacy ? parsed.pathname.split('=')[1] : path.length >= 6 ? path[4] : '',
    );
    return result;
  }

  static generateUrl({ baseUrl, params, legacy }) {
    const paramStr = GPhotosUrl.stringifyParams(params);
    const url = [baseUrl, paramStr].join(legacy ? '/' : '=');
    return `${url}${legacy ? '/' : ''}`;
  }

  static parseParams(paramStr) {
    const paramsArr = paramStr
      .split('-')
      .filter(s => s)
      .map(p => p.split(/(\d+)/).filter(p => p));
    const params = {};
    for (const arr of paramsArr) {
      params[arr[0]] = arr[1] ? parseInt(arr[1], 10) : true;
    }
    return params;
  }

  static stringifyParams(params) {
    const arr = [];
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== 0 && !value) {
        return;
      } else if (typeof value === 'boolean') {
        arr.push(key);
      } else {
        arr.push(`${key}${value}`);
      }
    });
    return arr.join('-');
  }
}

export function getOptimizedImage(src, width, height) {
  if (/googleusercontent\.com/.test(src)) {
    return GPhotosUrl.getOptimized(src, width, height);
  }
  return src;
}

export function getProgressiveImage(src, webp) {
  if (/googleusercontent\.com/.test(src)) {
    return GPhotosUrl.getProgressive(src, webp);
  }
  return;
}

/**
 * @param {string} src
 * @returns {string}
 */
export function getWebpImage(src) {
  if (/googleusercontent\.com/.test(src)) {
    return GPhotosUrl.getWebp(src);
  }
  // if (/youtube\.com/.test(src)) {
  //   const [id] = src.split('/').slice(-2, -1);
  //   return `https://img.youtube.com/vi_webp/${id}/0.webp`;
  // }

  return src;
}
