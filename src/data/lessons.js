export const LESSON_IDS = {
  module1: 'module-1-verbs',
  sukun: 'sukun-2026-07-30',
  shadda: 'shadda-2026-08-04',
  stress: 'stress-2026-08-08',
  taMarbuta: 'ta-marbuta-ta-maftuha-2026-08-08',
  solarLunar: 'solar-lunar-letters-2026-08-11',
  partsOfSpeech: 'parts-of-speech-2026-08-19',
  particlesFromRules: 'particles-from-rules-2026-08-19'
};

export const LESSONS = [
  {
    id: LESSON_IDS.module1,
    label: 'Глаголы с 1го модуля',
    date: '2026-07',
    order: 1
  },
  {
    id: LESSON_IDS.sukun,
    label: 'Слова с урока про Сукун',
    date: '2026-07-30',
    order: 2
  },
  {
    id: LESSON_IDS.shadda,
    label: 'Слова с урока про Шадда',
    date: '2026-08-04',
    order: 3
  },
  {
    id: LESSON_IDS.stress,
    label: 'Слова с урока про ударения',
    date: '2026-08-08',
    order: 4
  },
  {
    id: LESSON_IDS.taMarbuta,
    label: 'Слова с урока про та-марбута, та-мафтуха',
    date: '2026-08-08',
    order: 5
  },
  {
    id: LESSON_IDS.solarLunar,
    label: 'Слова с урока про солнечные и лунные буквы',
    date: '2026-08-11',
    order: 6
  },
  {
    id: LESSON_IDS.partsOfSpeech,
    label: '28 новых слов на выучить с урока о частях речи',
    date: '2026-08-19',
    order: 7
  },
  {
    id: LESSON_IDS.particlesFromRules,
    label: 'Частицы из статей справочника',
    date: '2026-08-19',
    order: 8
  }
];

export const LESSON_BY_ID = Object.fromEntries(
  LESSONS.map((lesson) => [lesson.id, lesson])
);

export const LESSON_FILTERS = [
  { id: 'all', label: 'Все уроки' },
  ...[...LESSONS]
    .sort((a, b) => b.order - a.order)
    .map((lesson) => ({ id: lesson.id, label: lesson.label }))
];
