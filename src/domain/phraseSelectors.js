const ARABIC_DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;

export const normalizePhraseSearch = (value = '') => (
  value
    .normalize('NFKD')
    .replace(ARABIC_DIACRITICS, '')
    .toLocaleLowerCase('ru')
    .trim()
);

export const filterPhrases = (
  phrases,
  { query = '', topicIds = [], lessonIds = [] } = {}
) => {
  const normalizedQuery = normalizePhraseSearch(query);

  return phrases.filter((phrase) => {
    const matchesTopic = topicIds.length === 0
      || topicIds.some((topicId) => phrase.topicIds.includes(topicId));
    const matchesLesson = lessonIds.length === 0
      || lessonIds.some((lessonId) => phrase.lessonIds.includes(lessonId));
    const searchable = normalizePhraseSearch([
      phrase.arabic,
      phrase.transcription,
      phrase.russian,
      ...phrase.alternativeTranslations
    ].join(' '));

    return matchesTopic && matchesLesson && (!normalizedQuery || searchable.includes(normalizedQuery));
  });
};

export const sortPhrasesByRussian = (phrases) => (
  [...phrases].sort((left, right) => (
    left.russian.localeCompare(right.russian, 'ru', { sensitivity: 'base' })
  ))
);

export const shuffleItems = (items) => {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
};

export const getTranslationOptions = (phrase, phrases, optionCount = 4) => {
  const sameTopic = phrases.filter((candidate) => (
    candidate.id !== phrase.id
    && candidate.russian !== phrase.russian
    && candidate.topicIds.some((topicId) => phrase.topicIds.includes(topicId))
  ));
  const remaining = phrases.filter((candidate) => (
    candidate.id !== phrase.id
    && candidate.russian !== phrase.russian
    && !sameTopic.some((sameTopicPhrase) => sameTopicPhrase.id === candidate.id)
  ));
  const distractors = shuffleItems([...sameTopic, ...remaining])
    .filter((candidate, index, candidates) => (
      candidates.findIndex((item) => item.russian === candidate.russian) === index
    ))
    .slice(0, Math.max(0, optionCount - 1))
    .map((candidate) => candidate.russian);

  return shuffleItems([phrase.russian, ...distractors]);
};
