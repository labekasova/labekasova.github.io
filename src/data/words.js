import { LESSON_BY_ID, LESSON_IDS } from './lessons.js';

export const WORD_TYPES = {
  verb: 'verb',
  noun: 'noun',
  particle: 'particle'
};

const MODULE_1 = LESSON_IDS.module1;
const SUKUN = LESSON_IDS.sukun;
const SHADDA = LESSON_IDS.shadda;

export const WORDS_BASE = [
  { id: 101, arabic: 'دَخَلَ', transcription: 'dakhala', russian: 'вошёл', translations: ['вошёл'], semanticGroup: 'Помещение и движение', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 102, arabic: 'خَرَجَ', transcription: 'kharaja', russian: 'вышел', translations: ['вышел'], semanticGroup: 'Помещение и движение', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 19, arabic: 'وَقَفَ', transcription: 'waqafa', russian: 'стоял', translations: ['стоял'], semanticGroup: 'Помещение и движение', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 2, arabic: 'جَلَسَ', transcription: 'jalasa', russian: 'сидел', translations: ['сидел'], semanticGroup: 'Помещение и движение', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 16, arabic: 'نَزَلَ', transcription: 'nazala', russian: 'спускался', translations: ['спускался'], semanticGroup: 'Помещение и движение', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 103, arabic: 'سَكَنَ', transcription: 'sakana', russian: 'жил / проживал', translations: ['жил', 'проживал'], semanticGroup: 'Помещение и движение', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 104, arabic: 'حَجَزَ', transcription: 'Hajaza', russian: 'забронировал', translations: ['забронировал'], semanticGroup: 'Поездка и визиты', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 105, arabic: 'طَلَبَ', transcription: 'Talaba', russian: 'потребовал / попросил', translations: ['потребовал', 'попросил'], semanticGroup: 'Поездка и визиты', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 106, arabic: 'طَرَقَ', transcription: 'Taraqa', russian: 'постучался', translations: ['постучался'], semanticGroup: 'Поездка и визиты', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 107, arabic: 'ظَهَرَ', transcription: 'DHahara', russian: 'появился', translations: ['появился'], semanticGroup: 'Поездка и визиты', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 24, arabic: 'سَبَحَ', transcription: 'sabaHa', russian: 'плыл', translations: ['плыл'], semanticGroup: 'Вода и Еда', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 25, arabic: 'شَرِبَ', transcription: 'shariba', russian: 'пил', translations: ['пил'], semanticGroup: 'Вода и Еда', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 108, arabic: 'أَكَلَ', transcription: '2akala', russian: 'покушал / ел', translations: ['покушал', 'ел'], semanticGroup: 'Вода и Еда', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 7, arabic: 'غَسَلَ', transcription: 'ghasala', russian: 'стирал / мыл', translations: ['стирал', 'мыл'], semanticGroup: 'Вода и Еда', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 109, arabic: 'لَبِسَ', transcription: 'labisa', russian: 'одел / надел', translations: ['одел', 'надел'], semanticGroup: 'Одежда и состояние', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 18, arabic: 'مَرِضَ', transcription: 'mariDa', russian: 'болел', translations: ['болел'], semanticGroup: 'Одежда и состояние', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 110, arabic: 'فَرِحَ', transcription: 'fariHa', russian: 'обрадовался', translations: ['обрадовался'], semanticGroup: 'Одежда и состояние', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 5, arabic: 'فَهِمَ', transcription: 'fahima', russian: 'понял', translations: ['понял'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 21, arabic: 'حَفِظَ', transcription: 'HafiDHa', russian: 'запоминал', translations: ['запоминал'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 111, arabic: 'دَرَسَ', transcription: 'darasa', russian: 'учил / учился', translations: ['учил', 'учился'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 112, arabic: 'عَلِمَ', transcription: '3alima', russian: 'знал', translations: ['знал'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 113, arabic: 'قَرَأَ', transcription: 'qara2a', russian: 'читал', translations: ['читал'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 114, arabic: 'كَتَبَ', transcription: 'kataba', russian: 'писал', translations: ['писал'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 20, arabic: 'أَخَذَ', transcription: '2akhadha', russian: 'взял / забрал', translations: ['взял', 'забрал'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 115, arabic: 'وَضَعَ', transcription: 'waDa3a', russian: 'положил', translations: ['положил'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 116, arabic: 'مَسَكَ', transcription: 'masaka', russian: 'держал', translations: ['держал'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 17, arabic: 'حَمَلَ', transcription: 'Hamala', russian: 'нёс', translations: ['нёс'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 15, arabic: 'دَفَعَ', transcription: 'dafa3a', russian: 'толкал', translations: ['толкал'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 14, arabic: 'رَبَطَ', transcription: 'rabaTa', russian: 'завязал', translations: ['завязал'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 4, arabic: 'هَدَمَ', transcription: 'hadama', russian: 'разрушил', translations: ['разрушил'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 117, arabic: 'فَقَدَ', transcription: 'faqada', russian: 'потерял', translations: ['потерял'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 8, arabic: 'وَجَدَ', transcription: 'wajada', russian: 'нашёл', translations: ['нашёл'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 11, arabic: 'عَمِلَ', transcription: '3amila', russian: 'сделал / выполнил', translations: ['сделал', 'выполнил'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 9, arabic: 'رَسَمَ', transcription: 'rasama', russian: 'рисовал', translations: ['рисовал'], semanticGroup: 'Творчество и активность', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 13, arabic: 'نَفَخَ', transcription: 'nafakha', russian: 'надул', translations: ['надул'], semanticGroup: 'Творчество и активность', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 10, arabic: 'ضَرَبَ', transcription: 'Daraba', russian: 'ударил', translations: ['ударил'], semanticGroup: 'Творчество и активность', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 118, arabic: 'حَكَمَ', transcription: 'Hakama', russian: 'управлял / судил', translations: ['управлял', 'судил'], semanticGroup: 'Творчество и активность', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 119, arabic: 'نَظَرَ', transcription: 'naDHara', russian: 'смотрел', translations: ['смотрел'], semanticGroup: 'Творчество и активность', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 12, arabic: 'سَكَتَ', transcription: 'sakata', russian: 'молчал', translations: ['молчал'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 6, arabic: 'شَكَرَ', transcription: 'shakara', russian: 'поблагодарил', translations: ['поблагодарил'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 3, arabic: 'حَمِدَ', transcription: 'Hamida', russian: 'воздал хвалу [Богу]', translations: ['воздал хвалу [Богу]'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: MODULE_1, root: 'ح م د' },
  { id: 1, arabic: 'سَجَدَ', transcription: 'sajada', russian: 'совершил земной поклон', translations: ['совершил земной поклон'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 201, arabic: 'مَغْرِبُ', transcription: 'maghribu', russian: 'закат, вечернее время', translations: ['закат', 'вечернее время'], semanticGroup: 'Время дня', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 202, arabic: 'دَفْتَرُ', transcription: 'daftaru', russian: 'тетрадь', translations: ['тетрадь'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 203, arabic: 'مَوْزُ', transcription: 'mawzu', russian: 'банан', translations: ['банан'], semanticGroup: 'Вода и Еда', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 204, arabic: 'وَرْدَةُ', transcription: 'wardatu', russian: 'цветок / роза', translations: ['цветок', 'роза'], semanticGroup: 'Растения', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 205, arabic: 'مُسْلِمُ', transcription: 'muslimu', russian: 'мусульманин / покорный [Богу]', translations: ['мусульманин', 'покорный [Богу]'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 206, arabic: 'بِنْتُ', transcription: 'bintu', russian: 'девочка / дочь', translations: ['девочка', 'дочь'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 207, arabic: 'مُحَمَّدُ', transcription: 'muHammadu', russian: 'Мухаммад / восхваляемый', translations: ['Мухаммад', 'восхваляемый'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: SHADDA, root: 'ح م د' },
  { id: 208, arabic: 'يَحُجُّ', transcription: 'yaHujju', russian: 'совершает хадж', translations: ['совершает хадж'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.verb, lessonId: SHADDA },
  { id: 209, arabic: 'سِنُّ', transcription: 'sinnu', russian: 'зуб', translations: ['зуб'], semanticGroup: 'Тело', type: WORD_TYPES.noun, lessonId: SHADDA },
  { id: 210, arabic: 'صَدَّقَ', transcription: 'Saddaqa', russian: 'поверил / признал истинным', translations: ['поверил', 'признал истинным'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: SHADDA },
  { id: 211, arabic: 'جَنَّةٌ', transcription: 'jannatun', russian: 'рай / сад', translations: ['рай', 'сад'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: SHADDA },
  { id: 212, arabic: 'كَذَّبَ', transcription: 'kadhdhaba', russian: 'отрицал / счёл ложью', translations: ['отрицал', 'счёл ложью'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: SHADDA }
];

const AUDIO_READY_TRANSCRIPTIONS = new Set([
  ...WORDS_BASE
    .filter((word) => word.id < 200)
    .map((word) => word.transcription),
  'bintu',
  'daftaru',
  'mawzu',
  'maghribu',
  'muslimu',
  'wardatu',
  'muHammadu',
  'yaHujju',
  'sinnu',
  'Saddaqa',
  'jannatun',
  'kadhdhaba'
]);

export const WORDS_DATA = WORDS_BASE.map((word) => ({
  ...word,
  group: LESSON_BY_ID[word.lessonId].label,
  audio: AUDIO_READY_TRANSCRIPTIONS.has(word.transcription)
    ? `/audio/${word.transcription}.mp3`
    : null
}));
