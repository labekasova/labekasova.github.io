import { readFile } from 'node:fs/promises';

const appSource = await readFile('src/App.jsx', 'utf8');

if (!/useEffect\(\(\) => \{\s*window\.scrollTo\(\{\s*top:\s*0[\s\S]{0,180}\}, \[location\.pathname\]\);/.test(appSource)) {
  throw new Error('При переходе между правилами не сбрасывается прокрутка страницы браузера.');
}

if (!/mainRef\.current\?\.scrollTo\(\{\s*top:\s*0/.test(appSource)) {
  throw new Error('При переходе между правилами не сбрасывается прокрутка внутренней области приложения.');
}

console.log('Переходы между правилами сбрасывают прокрутку страницы и внутренней области.');
