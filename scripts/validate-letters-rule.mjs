import { readFile } from 'node:fs/promises';

const indexSource = await readFile('src/data/rulesIndex.js', 'utf8');
const articleSource = await readFile('src/content/rules/letters.md', 'utf8');
const librarySource = await readFile('src/features/rules/RulesLibrary.jsx', 'utf8');
const styleSource = await readFile('src/style.css', 'utf8');
const languageSource = await readFile('src/data/ruleLanguage.js', 'utf8');

if (!indexSource.includes("id: 'letters'")) {
  throw new Error('Статья «Буквы» не зарегистрирована в каталоге правил.');
}

if (!articleSource.includes('[[letters-grid]]')) {
  throw new Error('В статье «Буквы» отсутствует интерактивная сетка букв.');
}

if (!librarySource.includes('/audio/letters/')) {
  throw new Error('Плитки букв не используют отдельную папку аудио letters.');
}

if (!styleSource.includes('grid-template-columns: repeat(4, minmax(0, 1fr));')) {
  throw new Error('На мобильном экране плитки букв должны идти по четыре в ряд.');
}

if (!styleSource.includes('.letters-grid {\n  direction: rtl;')) {
  throw new Error('Сетка арабского алфавита должна заполняться справа налево.');
}

if (!librarySource.includes('const [selectedLetter, setSelectedLetter] = useState(ARABIC_LETTERS[0]);')) {
  throw new Error('Над алфавитом должна быть постоянная строка с выбранной буквой.');
}

if (librarySource.includes('onPointerDown') || librarySource.includes('onPointerUp')) {
  throw new Error('Подсказка букв не должна требовать долгого нажатия.');
}

if (!librarySource.includes('{letter.name}') || !librarySource.includes('setSelectedLetter(letter)')) {
  throw new Error('Плитка должна показывать русское название и обновлять выбранную букву по нажатию.');
}

if (!styleSource.includes('.letters-tile-playing') || !styleSource.includes('background-color: #4f46e5')) {
  throw new Error('У активной плитки должен быть заметный выбранный стиль.');
}

if (!librarySource.includes("['ز', 'За', 'z',")) {
  throw new Error('Буква ز должна быть подписана «За» с транскрипцией [z].');
}

if (librarySource.includes('Volume2 size={16}')) {
  throw new Error('На плитках букв не должен отображаться отдельный значок динамика.');
}

for (const fileName of ['haa-deep', 'taa-emphatic', 'haa-light']) {
  if (!librarySource.includes(fileName)) {
    throw new Error(`Для букв с одинаковым именем нужен уникальный путь: ${fileName}.`);
  }
}

if (!languageSource.includes("letters: {") || !languageSource.includes("audio: '/audio/letters/al-Huruuf_al-3arabiyyah.mp3'")) {
  throw new Error('Для заголовка статьи «Буквы» нужна отдельная озвучка из папки letters.');
}

if (librarySource.includes("rule.id !== 'letters'")) {
  throw new Error('Озвучка и транскрипция заголовка должны отображаться у статьи «Буквы».');
}

console.log('Проверена статья «Буквы» и её интерактивные плитки.');
