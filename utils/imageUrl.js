class GPhotosUrl {
  static getOptimized(src, width, height) {
    const { baseUrl, params } = GPhotosUrl.parseUrl(src);
    Object.assign(params, {
      s: params.w || params.h ? null : params.s,
      w: width || params.w,
      h: height || params.h,
    });
    return GPhotosUrl.generateUrl({ baseUrl, params });
  }

  static getProgressive(src, webp) {
    const { baseUrl, params } = GPhotosUrl.parseUrl(src);
    Object.assign(params, { w: null, h: null, s: '50', f: 'Soften=1,30,0', rw: !!webp });
    return GPhotosUrl.generateUrl({ baseUrl, params });
  }

  static getWebp(src) {
    const { baseUrl, params } = GPhotosUrl.parseUrl(src);
    return GPhotosUrl.generateUrl({ baseUrl, params: { ...params, rw: true } });
  }

  static parseUrl(src) {
    const [url] = src.split('?');
    const [baseUrl, paramStr = ''] = url.split('=');
    return {
      baseUrl,
      params: GPhotosUrl.parseParams(paramStr),
    };
  }

  static generateUrl({ baseUrl, params }) {
    return [baseUrl, GPhotosUrl.stringifyParams(params)].join('=');
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

export function getWebpImage(src) {
  if (/googleusercontent\.com/.test(src)) {
    return GPhotosUrl.getWebp(src);
  }
  // if (/youtube\.com/.test(src)) {
  //   const [id] = src.split('/').slice(-2, -1);
  //   return `https://img.youtube.com/vi_webp/${id}/0.webp`;
  // }

  return;
}
