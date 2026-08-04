const russianCollator = new Intl.Collator('ru', {
  sensitivity: 'base',
  numeric: true
});

const ARABIC_DIACRITICS_PATTERN = /[\u064B-\u065F\u0670]/g;

export const getPrimaryTranslation = (word) => (
  word.translations?.[0] ?? word.russian
);

export const sortWordsByRussian = (words) => (
  [...words].sort((left, right) => (
    russianCollator.compare(
      getPrimaryTranslation(left),
      getPrimaryTranslation(right)
    )
  ))
);

export const normalizeSearchValue = (value) => (
  String(value ?? '')
    .toLocaleLowerCase('ru')
    .replace(ARABIC_DIACRITICS_PATTERN, '')
    .trim()
);

export const filterWords = (words, filters = {}) => {
  const {
    type = null,
    lessonId = 'all',
    query = ''
  } = filters;
  const normalizedQuery = normalizeSearchValue(query);

  return words.filter((word) => {
    const matchesType = type ? word.type === type : true;
    const matchesLesson = lessonId === 'all'
      ? true
      : word.lessonId === lessonId;
    const searchableText = normalizeSearchValue([
      word.arabic,
      word.transcription,
      ...word.translations
    ].join(' '));
    const matchesQuery = normalizedQuery
      ? searchableText.includes(normalizedQuery)
      : true;

    return matchesType && matchesLesson && matchesQuery;
  });
};

export const buildRepeatedRootIndex = (words) => {
  const rootIndex = words.reduce((index, word) => {
    if (!word.root) return index;

    if (!index[word.root]) {
      index[word.root] = [];
    }

    index[word.root].push(word);
    return index;
  }, {});

  return Object.fromEntries(
    Object.entries(rootIndex).filter(([, rootWords]) => rootWords.length > 1)
  );
};
