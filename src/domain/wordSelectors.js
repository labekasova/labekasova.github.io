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
    types = null,
    lessonId = 'all',
    lessonIds = null,
    query = ''
  } = filters;
  const selectedTypes = Array.isArray(types)
    ? types
    : type
      ? [type]
      : [];
  const selectedLessonIds = Array.isArray(lessonIds)
    ? lessonIds
    : lessonId && lessonId !== 'all'
      ? [lessonId]
      : [];
  const normalizedQuery = normalizeSearchValue(query);

  return words.filter((word) => {
    const matchesType = selectedTypes.length === 0
      ? true
      : selectedTypes.includes(word.type);
    const matchesLesson = selectedLessonIds.length === 0
      ? true
      : selectedLessonIds.includes(word.lessonId);
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
