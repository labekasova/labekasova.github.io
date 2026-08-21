export const TOPIC_IDS = {
  greetings: 'greetings',
  introductions: 'introductions',
  personalQuestions: 'personal-questions',
  demonstratives: 'demonstratives',
  location: 'location',
  descriptions: 'descriptions',
  seeing: 'seeing',
  everydayActions: 'everyday-actions'
};

export const TOPICS = [
  { id: TOPIC_IDS.greetings, label: 'Приветствия', order: 1 },
  { id: TOPIC_IDS.introductions, label: 'Знакомство', order: 2 },
  { id: TOPIC_IDS.personalQuestions, label: 'Личные вопросы', order: 3 },
  { id: TOPIC_IDS.demonstratives, label: 'Кто и что это', order: 4 },
  { id: TOPIC_IDS.location, label: 'Место и направление', order: 5 },
  { id: TOPIC_IDS.descriptions, label: 'Описание людей и предметов', order: 6 },
  { id: TOPIC_IDS.seeing, label: 'Глагол «видеть»', order: 7 },
  { id: TOPIC_IDS.everydayActions, label: 'Повседневные действия', order: 8 }
];

export const TOPIC_BY_ID = Object.fromEntries(
  TOPICS.map((topic) => [topic.id, topic])
);
