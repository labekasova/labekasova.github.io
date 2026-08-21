import { LESSON_IDS } from './lessons.js';
import { TOPIC_IDS } from './topics.js';

const definePhrase = ({
  id,
  arabic,
  transcription,
  russian,
  topicIds,
  lessonIds = [],
  sourceId,
  buildTokens
}) => ({
  id,
  arabic,
  transcription,
  russian,
  alternativeTranslations: [],
  topicIds,
  lessonIds,
  sourceId,
  buildTokens: buildTokens ?? arabic.split(/\s+/),
  audio: null
});

export const PHRASES_DATA = [
  definePhrase({
    id: 'i-see-you',
    arabic: 'أَنَا أَرَاكَ',
    transcription: '2anaa 2araaka',
    russian: 'Я вижу тебя.',
    topicIds: [TOPIC_IDS.seeing],
    sourceId: 'seeing-verb'
  }),
  definePhrase({
    id: 'you-see-me',
    arabic: 'أَنْتَ تَرَانِي',
    transcription: '2anta taraanii',
    russian: 'Ты видишь меня.',
    topicIds: [TOPIC_IDS.seeing],
    sourceId: 'seeing-verb'
  }),
  definePhrase({
    id: 'we-see-them',
    arabic: 'نَحْنُ نَرَاهُمْ',
    transcription: 'nahnu naraahum',
    russian: 'Мы видим их.',
    topicIds: [TOPIC_IDS.seeing],
    sourceId: 'seeing-verb'
  }),
  definePhrase({
    id: 'they-did-not-see-us',
    arabic: 'هُمْ مَا رَأَوْنَا',
    transcription: 'hum maa ra2awnaa',
    russian: 'Они не видели нас.',
    topicIds: [TOPIC_IDS.seeing],
    sourceId: 'seeing-verb'
  }),
  definePhrase({
    id: 'he-sees-her',
    arabic: 'هُوَ يَرَاهَا',
    transcription: 'huwa yaraahaa',
    russian: 'Он видит её.',
    topicIds: [TOPIC_IDS.seeing],
    sourceId: 'seeing-verb'
  }),
  definePhrase({
    id: 'she-did-not-see-him',
    arabic: 'هِيَ مَا رَأَتْهُ',
    transcription: 'hiya maa ra2at-hu',
    russian: 'Она не видела его.',
    topicIds: [TOPIC_IDS.seeing],
    sourceId: 'seeing-verb'
  }),
  definePhrase({
    id: 'i-am-big',
    arabic: 'أَنَا كَبِيرٌ',
    transcription: '2anaa kabiir',
    russian: 'Я большой.',
    topicIds: [TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.personalPronouns],
    sourceId: 'adjectives'
  }),
  definePhrase({
    id: 'you-are-small',
    arabic: 'أَنْتَ صَغِيرٌ',
    transcription: '2anta saghiir',
    russian: 'Ты маленький.',
    topicIds: [TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.personalPronouns],
    sourceId: 'adjectives'
  }),
  definePhrase({
    id: 'we-are-tall',
    arabic: 'نَحْنُ طِوَالٌ',
    transcription: 'nahnu tiwaal',
    russian: 'Мы высокие.',
    topicIds: [TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.personalPronouns],
    sourceId: 'adjectives'
  }),
  definePhrase({
    id: 'they-are-short',
    arabic: 'هُمْ قِصَارٌ',
    transcription: 'hum qisaar',
    russian: 'Они низкие.',
    topicIds: [TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.personalPronouns],
    sourceId: 'adjectives'
  }),
  definePhrase({
    id: 'he-is-big',
    arabic: 'هُوَ كَبِيرٌ',
    transcription: 'huwa kabiir',
    russian: 'Он большой.',
    topicIds: [TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.personalPronouns],
    sourceId: 'adjectives'
  }),
  definePhrase({
    id: 'she-is-big',
    arabic: 'هِيَ كَبِيرَةٌ',
    transcription: 'hiya kabiira',
    russian: 'Она большая.',
    topicIds: [TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.personalPronouns],
    sourceId: 'adjectives'
  }),
  definePhrase({
    id: 'who-are-you-plural',
    arabic: 'مَنْ أَنْتُمْ؟',
    transcription: 'man antum?',
    russian: 'Кто вы?',
    topicIds: [TOPIC_IDS.personalQuestions],
    lessonIds: [LESSON_IDS.personalPronouns, LESSON_IDS.questionWords],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'who-are-you-masculine',
    arabic: 'مَنْ أَنْتَ؟',
    transcription: 'man anta?',
    russian: 'Кто ты?',
    topicIds: [TOPIC_IDS.personalQuestions],
    lessonIds: [LESSON_IDS.personalPronouns, LESSON_IDS.questionWords],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'who-is-she',
    arabic: 'مَنْ هِيَ؟',
    transcription: 'man hiya?',
    russian: 'Кто она?',
    topicIds: [TOPIC_IDS.personalQuestions],
    lessonIds: [LESSON_IDS.personalPronouns, LESSON_IDS.questionWords],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'who-is-he',
    arabic: 'مَنْ هُوَ؟',
    transcription: 'man huwa?',
    russian: 'Кто он?',
    topicIds: [TOPIC_IDS.personalQuestions],
    lessonIds: [LESSON_IDS.personalPronouns, LESSON_IDS.questionWords],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'who-is-this-masculine',
    arabic: 'مَنْ هٰذَا؟',
    transcription: 'man haadhaa?',
    russian: 'Кто это?',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns, LESSON_IDS.questionWords],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'this-is-a-teacher',
    arabic: 'هٰذَا مُعَلِّمٌ',
    transcription: 'haadhaa mu3allim',
    russian: 'Это учитель.',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'who-are-these',
    arabic: 'مَنْ هٰؤُلَاءِ؟',
    transcription: 'man haa2ulaa2i?',
    russian: 'Кто это? / Кто они?',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns, LESSON_IDS.questionWords],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'these-are-teachers',
    arabic: 'هٰؤُلَاءِ مُعَلِّمُونَ',
    transcription: 'haa2ulaa2i mu3allimuun',
    russian: 'Это учителя.',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'this-man-is-a-teacher',
    arabic: 'هٰذَا الرَّجُلُ مُعَلِّمٌ',
    transcription: 'haadhaa ar-rajul mu3allim',
    russian: 'Этот мужчина учитель.',
    topicIds: [TOPIC_IDS.demonstratives, TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'these-men-are-teachers',
    arabic: 'هٰؤُلَاءِ الرِّجَالُ مُعَلِّمُونَ',
    transcription: 'haa2ulaa2i ar-rijaal mu3allimuun',
    russian: 'Эти мужчины учителя.',
    topicIds: [TOPIC_IDS.demonstratives, TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'this-woman-is-a-teacher',
    arabic: 'هٰذِهِ الْمَرْأَةُ مُعَلِّمَةٌ',
    transcription: 'haadhihi al-mar2a mu3allima',
    russian: 'Эта женщина учительница.',
    topicIds: [TOPIC_IDS.demonstratives, TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'who-pronouns'
  }),
  definePhrase({
    id: 'this-is-a-house',
    arabic: 'هٰذَا بَيْتٌ',
    transcription: 'haadhaa bayt',
    russian: 'Это дом.',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'this-is-a-room',
    arabic: 'هٰذِهِ حُجْرَةٌ',
    transcription: 'haadhihi hujra',
    russian: 'Это комната.',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'where-is-the-teacher',
    arabic: 'أَيْنَ الْمُعَلِّمُ؟',
    transcription: '2ayna al-mu3allim?',
    russian: 'Где учитель?',
    topicIds: [TOPIC_IDS.location],
    lessonIds: [LESSON_IDS.questionWords],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'teacher-is-at-school',
    arabic: 'الْمُعَلِّمُ فِي الْمَدْرَسَةِ',
    transcription: 'al-mu3allim fii al-madrasa',
    russian: 'Учитель в школе.',
    topicIds: [TOPIC_IDS.location],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'where-is-the-pupil',
    arabic: 'أَيْنَ التِّلْمِيذُ؟',
    transcription: '2ayna at-tilmiidh?',
    russian: 'Где ученик?',
    topicIds: [TOPIC_IDS.location],
    lessonIds: [LESSON_IDS.questionWords],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'pupil-is-in-class',
    arabic: 'التِّلْمِيذُ فِي الْفَصْلِ',
    transcription: 'at-tilmiidh fii al-fasl',
    russian: 'Ученик в классе.',
    topicIds: [TOPIC_IDS.location],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'who-is-in-the-house',
    arabic: 'مَنْ فِي الْبَيْتِ؟',
    transcription: 'man fii al-bayt?',
    russian: 'Кто в доме?',
    topicIds: [TOPIC_IDS.location, TOPIC_IDS.personalQuestions],
    lessonIds: [LESSON_IDS.questionWords],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'man-is-in-the-house',
    arabic: 'فِي الْبَيْتِ رَجُلٌ',
    transcription: 'fii al-bayt rajul',
    russian: 'В доме мужчина.',
    topicIds: [TOPIC_IDS.location],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'i-took-water-and-bread',
    arabic: 'أَخَذْتُ مَاءً وَخُبْزًا وَوَضَعْتُهُ فِي الْحُجْرَةِ',
    transcription: '2akhadhtu maa2an wa khubzan wa wada3tuhu fii al-hujra',
    russian: 'Я взял воду и хлеб и положил это в комнате / в комнату.',
    topicIds: [TOPIC_IDS.everydayActions, TOPIC_IDS.location],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'what-is-this-masculine',
    arabic: 'مَا هٰذَا؟',
    transcription: 'maa haadhaa?',
    russian: 'Что это?',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns, LESSON_IDS.questionWords],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'this-is-a-book',
    arabic: 'هٰذَا كِتَابٌ',
    transcription: 'haadhaa kitaab',
    russian: 'Это книга.',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'what-is-this-feminine',
    arabic: 'مَا هٰذِهِ؟',
    transcription: 'maa haadhihi?',
    russian: 'Что это?',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns, LESSON_IDS.questionWords],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'this-is-a-briefcase',
    arabic: 'هٰذِهِ مِحْفَظَةٌ',
    transcription: 'haadhihi miHfaZa',
    russian: 'Это портфель.',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'this-book-is-big',
    arabic: 'هٰذَا كِتَابٌ كَبِيرٌ',
    transcription: 'haadhaa kitaab kabiir',
    russian: 'Эта книга большая.',
    topicIds: [TOPIC_IDS.demonstratives, TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'these-books-are-small',
    arabic: 'هٰذِهِ الْكُتُبُ الصَّغِيرَةُ',
    transcription: 'haadhihi al-kutub as-saghiira',
    russian: 'Эти книги маленькие.',
    topicIds: [TOPIC_IDS.demonstratives, TOPIC_IDS.descriptions],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'whose-book-is-this',
    arabic: 'لِمَنْ هٰذَا الْكِتَابُ؟',
    transcription: 'liman haadhaa al-kitaab?',
    russian: 'Чья это книга?',
    topicIds: [TOPIC_IDS.demonstratives, TOPIC_IDS.personalQuestions],
    lessonIds: [LESSON_IDS.demonstrativePronouns, LESSON_IDS.questionWords],
    sourceId: 'this-who-where-whose'
  }),
  definePhrase({
    id: 'this-book-belongs-to-teacher',
    arabic: 'هٰذَا الْكِتَابُ لِلْمُعَلِّمِ',
    transcription: 'haadhaa al-kitaab lil-mu3allim',
    russian: 'Это книга учителя.',
    topicIds: [TOPIC_IDS.demonstratives],
    lessonIds: [LESSON_IDS.demonstrativePronouns],
    sourceId: 'this-who-where-whose'
  })
];

export const PHRASE_BY_ID = Object.fromEntries(
  PHRASES_DATA.map((phrase) => [phrase.id, phrase])
);
