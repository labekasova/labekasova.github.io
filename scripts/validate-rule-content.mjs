import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const rulesDirectory = new URL('../src/content/rules/', import.meta.url);
const indexPath = new URL('../src/data/rulesIndex.js', import.meta.url);
const expectedNewRules = [
  ['demonstrative-pronouns', 'demonstrative-pronouns.md'],
  ['personal-pronouns', 'personal-pronouns.md'],
  ['hamza', 'hamza.md'],
  ['parts-of-speech', 'parts-of-speech.md']
];

const indexSource = await readFile(indexPath, 'utf8');
let previousPosition = -1;

for (const [ruleId, fileName] of expectedNewRules) {
  const contentPath = new URL(fileName, rulesDirectory);
  const content = await readFile(contentPath, 'utf8');

  if (content.trim().length < 500) {
    throw new Error(`Статья ${fileName} выглядит неполной.`);
  }
  if (!/^## /m.test(content) || !/^### /m.test(content)) {
    throw new Error(`В статье ${fileName} нет ожидаемой структуры заголовков.`);
  }

  const position = indexSource.indexOf(`id: '${ruleId}'`);
  if (position < 0) {
    throw new Error(`Правило ${ruleId} не зарегистрировано в индексе.`);
  }
  if (position <= previousPosition) {
    throw new Error('Новые правила зарегистрированы не в заданном порядке.');
  }

  previousPosition = position;
}

console.log(`Проверено новых статей: ${expectedNewRules.length}.`);
console.log(`Каталог: ${fileURLToPath(rulesDirectory)}`);
