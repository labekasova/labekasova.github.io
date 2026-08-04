export const LESSON_IDS = {
  module1: 'module-1-verbs',
  sukun: 'sukun-2026-07-30',
  shadda: 'shadda-2026-08-04'
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
