import { LESSON_BY_ID, LESSON_IDS } from '../src/data/lessons.js';
import { WORDS_BASE, WORDS_DATA, WORD_TYPES } from '../src/data/words.js';
import {
  buildRepeatedRootIndex,
  filterWords,
  getPrimaryTranslation,
  sortWordsByRussian
} from '../src/domain/wordSelectors.js';

const EXPECTED_WORD_COUNT = 73;

const fail = (message) => {
  throw new Error(message);
};

if (WORDS_BASE.length !== EXPECTED_WORD_COUNT) {
  fail(`Ожидалось ${EXPECTED_WORD_COUNT} слов, найдено ${WORDS_BASE.length}.`);
}

const ids = new Set();
const arabicForms = new Set();

WORDS_BASE.forEach((word) => {
  if (ids.has(word.id)) fail(`Повторяется id ${word.id}.`);
  if (arabicForms.has(word.arabic)) fail(`Повторяется слово ${word.arabic}.`);
  if (!LESSON_BY_ID[word.lessonId]) fail(`У слова ${word.arabic} неизвестный lessonId.`);
  if (!word.translations?.length) fail(`У слова ${word.arabic} нет массива переводов.`);
  if (word.translations.some((translation) => !word.russian.includes(translation))) {
    fail(`У слова ${word.arabic} russian не содержит все translations.`);
  }

  ids.add(word.id);
  arabicForms.add(word.arabic);
});

if (WORDS_DATA.some((word) => !word.group)) {
  fail('Не для всех слов вычислена подпись урока.');
}

const sortedWords = sortWordsByRussian(WORDS_DATA);
if (sortedWords.some((word) => !getPrimaryTranslation(word))) {
  fail('Не для всех слов определён основной перевод для сортировки.');
}
if (getPrimaryTranslation(sortedWords[0]) !== 'Аиша') {
  fail('Русская сортировка словаря не начинается со слова «Аиша».');
}

const repeatedRoots = buildRepeatedRootIndex(WORDS_DATA);
const hamdRootWords = repeatedRoots['ح م د'] ?? [];
if (hamdRootWords.length !== 2) {
  fail('Ожидалась пара однокоренных слов для корня ح م د.');
}

const expectedRepeatedRootCounts = {
  'ك ت ب': 2,
  'س ل م': 3,
  'د ر س': 2,
  'ج د د': 2
};

Object.entries(expectedRepeatedRootCounts).forEach(([root, expectedCount]) => {
  const actualCount = repeatedRoots[root]?.length ?? 0;
  if (actualCount !== expectedCount) {
    fail(`Для корня ${root} найдено ${actualCount} слов вместо ${expectedCount}.`);
  }
});

const expectedFilterCounts = [
  [{ type: WORD_TYPES.verb }, 47],
  [{ type: WORD_TYPES.noun }, 26],
  [{ type: WORD_TYPES.particle }, 0],
  [{ lessonId: LESSON_IDS.module1 }, 42],
  [{ lessonId: LESSON_IDS.sukun }, 6],
  [{ lessonId: LESSON_IDS.shadda }, 6],
  [{ lessonId: LESSON_IDS.stress }, 7],
  [{ lessonId: LESSON_IDS.taMarbuta }, 12],
  [{ type: WORD_TYPES.noun, lessonId: LESSON_IDS.shadda }, 3],
  [{ type: WORD_TYPES.noun, lessonId: LESSON_IDS.stress }, 7],
  [{ type: WORD_TYPES.verb, lessonId: LESSON_IDS.taMarbuta }, 2]
];

expectedFilterCounts.forEach(([filters, expectedCount]) => {
  const actualCount = filterWords(WORDS_DATA, filters).length;
  if (actualCount !== expectedCount) {
    fail(`Фильтр ${JSON.stringify(filters)} вернул ${actualCount} вместо ${expectedCount}.`);
  }
});

const multiSelectFilterCases = [
  [{ types: [WORD_TYPES.verb, WORD_TYPES.noun] }, 73],
  [{ lessonIds: [LESSON_IDS.sukun, LESSON_IDS.shadda] }, 12],
  [{
    types: [WORD_TYPES.verb, WORD_TYPES.noun],
    lessonIds: [LESSON_IDS.sukun, LESSON_IDS.shadda]
  }, 12],
  [{
    types: [WORD_TYPES.verb],
    lessonIds: [LESSON_IDS.sukun, LESSON_IDS.shadda]
  }, 3],
  [{
    types: [WORD_TYPES.noun, WORD_TYPES.particle],
    lessonIds: [LESSON_IDS.shadda]
  }, 3],
  [{
    lessonIds: [LESSON_IDS.stress, LESSON_IDS.taMarbuta]
  }, 19],
  [{
    types: [WORD_TYPES.noun],
    lessonIds: [LESSON_IDS.stress, LESSON_IDS.taMarbuta]
  }, 17]
];

multiSelectFilterCases.forEach(([filters, expectedCount]) => {
  const actualCount = filterWords(WORDS_DATA, filters).length;
  if (actualCount !== expectedCount) {
    fail(`Множественный фильтр ${JSON.stringify(filters)} вернул ${actualCount} вместо ${expectedCount}.`);
  }
});

const dictionarySearchCases = [
  ['Мухаммад', 207],
  ['muhammadu', 207],
  ['محمد', 207],
  ['сад', 211],
  ['книга', 301],
  ['مدرسة', 409],
  ['muthmiraat', 406]
];

dictionarySearchCases.forEach(([query, expectedId]) => {
  const results = filterWords(WORDS_DATA, { query });
  if (!results.some((word) => word.id === expectedId)) {
    fail(`Поиск «${query}» не нашёл ожидаемое слово id ${expectedId}.`);
  }
});

console.log(`Проверено слов: ${WORDS_DATA.length}.`);
console.log(`Уроков: ${Object.keys(LESSON_BY_ID).length}.`);
console.log(`Групп с повторяющимся корнем: ${Object.keys(repeatedRoots).length}.`);
