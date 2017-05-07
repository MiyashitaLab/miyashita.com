const headerEl = document.querySelector('header');

// Word wrap for Japanese
const titleElList = headerEl.querySelectorAll('header h1');
titleElList.forEach((titleEl) => {
  const wrapDivEl = document.createElement('div');

  Mikan.split(titleEl.textContent).forEach((text) => {
    const spanEl = document.createElement('span');
    spanEl.style.display = 'inline-block';
    spanEl.style.whiteSpace = 'pre';
    spanEl.setAttribute('role', 'presentation');
    spanEl.textContent = text;
    wrapDivEl.appendChild(spanEl);
  })

  titleEl.innerHTML = wrapDivEl.innerHTML;
});

// Hide related video in Youtube iframe
const youtubeElList = document.querySelectorAll('.markdown-body iframe[src*="youtube"]');
youtubeElList.forEach((youtubeEl, idx) => {
  let src = youtubeEl.getAttribute('src');
  src += (src.indexOf('?') !== -1) ? '&rel=0' : '?rel=0';
  youtubeEl.setAttribute('src', src);

  const wrapperEl = document.createElement('div');
  wrapperEl.classList.add('youtube');
  youtubeEl.parentNode.insertBefore(wrapperEl, youtubeEl);
  wrapperEl.appendChild(youtubeEl);

  if (idx === 0) {
    const articleEl = document.querySelector('article');
    articleEl.insertBefore(wrapperEl, articleEl.firstChild);

    const youtubeId = src.split('/').pop().split('?').shift();
    headerEl.style.backgroundImage = `url("https://i.ytimg.com/vi/${ youtubeId }/mqdefault.jpg")`;
  }
});
