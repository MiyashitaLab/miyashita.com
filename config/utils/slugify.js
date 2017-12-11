import XRegExp from 'xregexp';

const slugifyRe = XRegExp('[^\\p{Letter}\\p{Mark}\\p{Decimal_Number}]+', 'g');

export default function slugify(text) {
  return XRegExp.replace(text.trim(), slugifyRe, '-').replace(/(?:^-+|-+$)/g, '');
}
