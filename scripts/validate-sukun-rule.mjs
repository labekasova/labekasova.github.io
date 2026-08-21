import { readFile } from 'node:fs/promises';

const sukunContent = await readFile('src/content/rules/sukun.md', 'utf8');
const rulesIndex = await readFile('src/data/rulesIndex.js', 'utf8');
const rulesLibrary = await readFile('src/features/rules/RulesLibrary.jsx', 'utf8');

const requiredSukunFragments = [
  '**Сукун** — это знак **ْ**, который ставится над буквой и показывает, что после этой согласной нет короткой гласной: фатхи, даммы или касры.',
  'Над **ن** стоит сукун, поэтому после звука *n* никакая гласная не произносится. Мы читаем *min*, а не *mina*, *minu* или *mini*.',
  'Само слово «**Сукун**» означает «покой», «тишина», «неподвижность».',
  '- Арабское слово не может начинаться с сукуна. В начале слова должен быть гласный звук.',
  '- Сукун может встречаться в середине или в конце слова.',
  '- После буквы с сукуном сразу читаем следующую букву, без а, у или и.',
  '> **Важно:** сукун не означает, что буква «читается как в алфавите». Он означает именно отсутствие гласного звука после согласной.'
];

const forbiddenSukunFragments = ['السُّكُونُ', 'اِلْتِقَاءُ السَّاكِنَيْنِ'];

for (const fragment of requiredSukunFragments) {
  if (!sukunContent.includes(fragment)) {
    throw new Error(`В статье о сукуне отсутствует согласованный фрагмент: ${fragment}`);
  }
}

for (const fragment of forbiddenSukunFragments) {
  if (sukunContent.includes(fragment)) {
    throw new Error(`В статье о сукуне остался лишний фрагмент: ${fragment}`);
  }
}

const readingTimes = new Map([
  ['sukun', 1],
  ['shadda', 1],
  ['ta-marbuta', 2],
  ['madd', 2],
  ['solar-lunar', 3],
  ['pronouns', 7],
  ['demonstrative-pronouns', 5],
  ['personal-pronouns', 5],
  ['interrogative-words', 6],
  ['hamza', 6],
  ['parts-of-speech', 8]
]);

for (const [id, minutes] of readingTimes) {
  const ruleStart = rulesIndex.indexOf(`id: '${id}'`);
  const ruleEnd = rulesIndex.indexOf('\n  {', ruleStart + 1);
  const ruleSource = rulesIndex.slice(ruleStart, ruleEnd === -1 ? undefined : ruleEnd);

  if (!ruleSource.includes(`readMinutes: ${minutes}`)) {
    throw new Error(`Для правила «${id}» не задана длительность чтения ${minutes} мин.`);
  }
}

if (!rulesLibrary.includes('Примерное время чтения') || !rulesLibrary.includes('≈ {rule.readMinutes} мин')) {
  throw new Error('В заголовке статьи нет компактной метки примерного времени чтения.');
}

if (!rulesLibrary.includes("text === 'Сукун' || text === 'ْ'")) {
  throw new Error('В тексте статьи не выделяются цветом название и знак сукуна.');
}

console.log('Проверены статья о сукуне и метки времени всех правил.');
