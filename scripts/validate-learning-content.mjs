import { DIALOGUES_DATA } from '../src/data/dialogues.js';
import { LESSON_BY_ID } from '../src/data/lessons.js';
import { PHRASES_DATA } from '../src/data/phrases.js';
import { TOPIC_BY_ID } from '../src/data/topics.js';
import { VERB_CONJUGATIONS, VERB_TENSES } from '../src/data/verbConjugations.js';

const failures = [];

const validateUniqueIds = (items, label) => {
  const seen = new Set();
  items.forEach((item) => {
    if (!item.id) failures.push(label + ': отсутствует id.');
    if (seen.has(item.id)) failures.push(label + ': повторяется id ' + item.id + '.');
    seen.add(item.id);
  });
};

const validateRelations = (item, label) => {
  item.topicIds.forEach((id) => {
    if (!TOPIC_BY_ID[id]) failures.push(label + ': неизвестная тема ' + id + '.');
  });
  item.lessonIds.forEach((id) => {
    if (!LESSON_BY_ID[id]) failures.push(label + ': неизвестный урок ' + id + '.');
  });
};

validateUniqueIds(PHRASES_DATA, 'Фразы');
PHRASES_DATA.forEach((phrase) => {
  validateRelations(phrase, 'Фраза ' + phrase.id);
  if (!phrase.arabic || !phrase.transcription || !phrase.russian) {
    failures.push('Фраза ' + phrase.id + ': не заполнено обязательное поле.');
  }
  if (!Array.isArray(phrase.buildTokens) || phrase.buildTokens.join(' ') !== phrase.arabic) {
    failures.push('Фраза ' + phrase.id + ': buildTokens не собирают исходный текст.');
  }
});

validateUniqueIds(DIALOGUES_DATA, 'Диалоги');
DIALOGUES_DATA.forEach((dialogue) => {
  validateRelations(dialogue, 'Диалог ' + dialogue.id);
  const participantIds = new Set(dialogue.participants.map((participant) => participant.id));
  validateUniqueIds(dialogue.lines, 'Реплики диалога ' + dialogue.id);
  dialogue.lines.forEach((line) => {
    if (!participantIds.has(line.speakerId)) {
      failures.push('Диалог ' + dialogue.id + ': неизвестный speakerId ' + line.speakerId + '.');
    }
    if (!line.arabic || !line.transcription || !line.russian) {
      failures.push('Диалог ' + dialogue.id + ': у реплики ' + line.id + ' не заполнено обязательное поле.');
    }
  });
});

validateUniqueIds(VERB_CONJUGATIONS, 'Глаголы');
VERB_CONJUGATIONS.forEach((verb) => {
  VERB_TENSES.forEach((tense) => {
    const form = verb.forms[tense.id];
    if (!form) return;
    if (!form.arabic || !form.transcription || !form.russian) {
      failures.push('Глагол ' + verb.id + ': форма ' + tense.id + ' заполнена не полностью.');
    }
  });
});

if (failures.length > 0) {
  throw new Error('Проверка новых учебных материалов не пройдена:\n- ' + failures.join('\n- '));
}

console.log('Проверено фраз: ' + PHRASES_DATA.length + '.');
console.log('Проверено диалогов: ' + DIALOGUES_DATA.length + '.');
console.log('Проверено глаголов: ' + VERB_CONJUGATIONS.length + '.');
