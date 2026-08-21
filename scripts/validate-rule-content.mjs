import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const rulesDirectory = new URL('../src/content/rules/', import.meta.url);
const indexPath = new URL('../src/data/rulesIndex.js', import.meta.url);
const expectedNewRules = [
  ['pronouns', 'pronouns.md'],
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

const pronounsContent = await readFile(new URL('pronouns.md', rulesDirectory), 'utf8');
const requiredPronounsFragments = [
  '[«Указательные местоимения»](#/rules/demonstrative-pronouns)',
  '[«Личные местоимения»](#/rules/personal-pronouns)',
  '| أَنْتُمَا — *antumaa* | أَنْتُمَا — *antumaa* |',
  '| هُمَا — *humaa* | هُمَا — *humaa* |',
  '**رَأَيْتُهُ**',
  '*ra2aytuhu*'
];

for (const fragment of requiredPronounsFragments) {
  if (!pronounsContent.includes(fragment)) {
    throw new Error(`В статье «Местоимения» отсутствует обязательный фрагмент: ${fragment}`);
  }
}

const examplesWithRequiredAudio = [
  ['parts-of-speech.md', 'خَالِد', 'Khaalid'],
  ['solar-lunar.md', 'بَيْت', 'bayt'],
  ['solar-lunar.md', 'الْبَيْتُ', 'al-baytu'],
  ['solar-lunar.md', 'الْقَمَرُ', 'al-qamaru'],
  ['solar-lunar.md', 'الْعَصْرُ', 'al-3aSru'],
  ['solar-lunar.md', 'الشَّمْسُ', 'ash-shamsu'],
  ['solar-lunar.md', 'الصَّبَاحُ', 'aS-SabaaHu'],
  ['solar-lunar.md', 'الرُّكُوعُ', 'ar-rukuu3u']
];

for (const [fileName, arabic, transcription] of examplesWithRequiredAudio) {
  const content = await readFile(new URL(fileName, rulesDirectory), 'utf8');
  const expectedBlock = `**${arabic}**\n*${transcription}*`;

  if (!content.includes(expectedBlock)) {
    throw new Error(`У примера «${arabic}» нет отдельного блока с транскрипцией и озвучкой.`);
  }
}

console.log(`Проверено новых статей: ${expectedNewRules.length}.`);
console.log(`Каталог: ${fileURLToPath(rulesDirectory)}`);
