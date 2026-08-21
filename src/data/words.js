import { LESSON_BY_ID, LESSON_IDS } from './lessons.js';

export const WORD_TYPES = {
  verb: 'verb',
  noun: 'noun',
  particle: 'particle'
};

export const WORD_GENDERS = {
  masculine: 'masculine',
  feminine: 'feminine',
  common: 'common'
};

const MODULE_1 = LESSON_IDS.module1;
const SUKUN = LESSON_IDS.sukun;
const SHADDA = LESSON_IDS.shadda;
const STRESS = LESSON_IDS.stress;
const TA_MARBUTA = LESSON_IDS.taMarbuta;
const SOLAR_LUNAR = LESSON_IDS.solarLunar;
const PARTS_OF_SPEECH = LESSON_IDS.partsOfSpeech;
const PARTICLES_FROM_RULES = LESSON_IDS.particlesFromRules;
const FAMILIAR_SOUNDING_WORDS = LESSON_IDS.familiarSoundingWords;
const PERSONAL_PRONOUNS = LESSON_IDS.personalPronouns;

export const WORDS_BASE = [
  { id: 101, arabic: 'دَخَلَ', transcription: 'dakhala', russian: 'вошёл', translations: ['вошёл'], semanticGroup: 'Помещение и движение', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 102, arabic: 'خَرَجَ', transcription: 'kharaja', russian: 'вышел', translations: ['вышел'], semanticGroup: 'Помещение и движение', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 19, arabic: 'وَقَفَ', transcription: 'waqafa', russian: 'стоял', translations: ['стоял'], semanticGroup: 'Помещение и движение', type: WORD_TYPES.verb, lessonId: MODULE_1, root: 'و ق ف' },
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
  { id: 7, arabic: 'غَسَلَ', transcription: 'ghasala', russian: 'стирал / мыл', translations: ['стирал', 'мыл'], semanticGroup: 'Вода и Еда', type: WORD_TYPES.verb, lessonId: MODULE_1, root: 'غ س ل' },
  { id: 109, arabic: 'لَبِسَ', transcription: 'labisa', russian: 'одел / надел', translations: ['одел', 'надел'], semanticGroup: 'Одежда и состояние', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 18, arabic: 'مَرِضَ', transcription: 'mariDa', russian: 'болел', translations: ['болел'], semanticGroup: 'Одежда и состояние', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 110, arabic: 'فَرِحَ', transcription: 'fariHa', russian: 'обрадовался', translations: ['обрадовался'], semanticGroup: 'Одежда и состояние', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 5, arabic: 'فَهِمَ', transcription: 'fahima', russian: 'понял', translations: ['понял'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 21, arabic: 'حَفِظَ', transcription: 'HafiDHa', russian: 'запоминал', translations: ['запоминал'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 111, arabic: 'دَرَسَ', transcription: 'darasa', russian: 'учил / учился', translations: ['учил', 'учился'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1, root: 'د ر س' },
  { id: 112, arabic: 'عَلِمَ', transcription: '3alima', russian: 'знал', translations: ['знал'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 113, arabic: 'قَرَأَ', transcription: 'qara2a', russian: 'читал', translations: ['читал'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 114, arabic: 'كَتَبَ', transcription: 'kataba', russian: 'писал', translations: ['писал'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.verb, lessonId: MODULE_1, root: 'ك ت ب' },
  { id: 20, arabic: 'أَخَذَ', transcription: '2akhadha', russian: 'взял / забрал', translations: ['взял', 'забрал'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 115, arabic: 'وَضَعَ', transcription: 'waDa3a', russian: 'положил', translations: ['положил'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 116, arabic: 'مَسَكَ', transcription: 'masaka', russian: 'держал', translations: ['держал'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1 },
  { id: 17, arabic: 'حَمَلَ', transcription: 'Hamala', russian: 'нёс', translations: ['нёс'], semanticGroup: 'Действия руками', type: WORD_TYPES.verb, lessonId: MODULE_1, root: 'ح م ل' },
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
  { id: 1, arabic: 'سَجَدَ', transcription: 'sajada', russian: 'совершил земной поклон', translations: ['совершил земной поклон'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: MODULE_1, root: 'س ج د' },
  { id: 201, arabic: 'مَغْرِب', transcription: 'maghrib', russian: 'закат, вечернее время', translations: ['закат', 'вечернее время'], semanticGroup: 'Время дня', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 202, arabic: 'دَفْتَر', transcription: 'daftar', russian: 'тетрадь', translations: ['тетрадь'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 203, arabic: 'مَوْز', transcription: 'mawz', russian: 'банан', translations: ['банан'], semanticGroup: 'Вода и Еда', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 204, arabic: 'وَرْدَة', transcription: 'wardah', russian: 'цветок / роза', translations: ['цветок', 'роза'], semanticGroup: 'Растения', type: WORD_TYPES.noun, lessonId: SUKUN },
  { id: 205, arabic: 'مُسْلِم', transcription: 'muslim', russian: 'мусульманин / покорный [Богу]', translations: ['мусульманин', 'покорный [Богу]'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: SUKUN, root: 'س ل م' },
  { id: 206, arabic: 'بِنْت', transcription: 'bint', russian: 'девочка / дочь', translations: ['девочка', 'дочь'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: SUKUN, root: 'ب ن ي' },
  { id: 207, arabic: 'مُحَمَّد', transcription: 'muHammad', russian: 'Мухаммад / восхваляемый', translations: ['Мухаммад', 'восхваляемый'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: SHADDA, root: 'ح م د' },
  { id: 208, arabic: 'يَحُجُّ', transcription: 'yaHujju', russian: 'совершает хадж', translations: ['совершает хадж'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.verb, lessonId: SHADDA, root: 'ح ج ج' },
  { id: 209, arabic: 'سِنّ', transcription: 'sinn', russian: 'зуб', translations: ['зуб'], semanticGroup: 'Тело', type: WORD_TYPES.noun, lessonId: SHADDA },
  { id: 210, arabic: 'صَدَّقَ', transcription: 'Saddaqa', russian: 'поверил / признал истинным', translations: ['поверил', 'признал истинным'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: SHADDA, root: 'ص د ق' },
  { id: 211, arabic: 'جَنَّة', transcription: 'jannah', russian: 'рай / сад', translations: ['рай', 'сад'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: SHADDA },
  { id: 212, arabic: 'كَذَّبَ', transcription: 'kadhdhaba', russian: 'отрицал / счёл ложью', translations: ['отрицал', 'счёл ложью'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: SHADDA },
  { id: 301, arabic: 'كِتَاب', transcription: 'kitaab', russian: 'книга', translations: ['книга'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.noun, lessonId: STRESS, root: 'ك ت ب' },
  { id: 302, arabic: 'كُوب', transcription: 'kuub', russian: 'стакан', translations: ['стакан'], semanticGroup: 'Быт и предметы', type: WORD_TYPES.noun, lessonId: STRESS },
  { id: 303, arabic: 'عِيد', transcription: '3iid', russian: 'праздник', translations: ['праздник'], semanticGroup: 'Время и события', type: WORD_TYPES.noun, lessonId: STRESS },
  { id: 304, arabic: 'إِسْلَام', transcription: '2islaam', russian: 'ислам', translations: ['ислам'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: STRESS, root: 'س ل م' },
  { id: 305, arabic: 'أُسْبُوع', transcription: '2usbuu3', russian: 'неделя', translations: ['неделя'], semanticGroup: 'Время и события', type: WORD_TYPES.noun, lessonId: STRESS },
  { id: 306, arabic: 'جَدِيد', transcription: 'jadiid', russian: 'новый', translations: ['новый'], semanticGroup: 'Признаки', type: WORD_TYPES.noun, lessonId: STRESS, root: 'ج د د' },
  { id: 307, arabic: 'اللَّه', transcription: 'allaah', russian: 'Аллах / Бог', translations: ['Аллах', 'Бог'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: STRESS },
  { id: 401, arabic: 'قَالَتْ', transcription: 'qaalat', russian: 'она сказала', translations: ['она сказала'], semanticGroup: 'Общение и дух', type: WORD_TYPES.verb, lessonId: TA_MARBUTA },
  { id: 402, arabic: 'مُسْلِمَات', transcription: 'muslimaat', russian: 'мусульманки', translations: ['мусульманки'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: TA_MARBUTA, root: 'س ل م' },
  { id: 403, arabic: 'كَبِيرَة', transcription: 'kabiirah', russian: 'большая', translations: ['большая'], semanticGroup: 'Признаки', type: WORD_TYPES.noun, lessonId: TA_MARBUTA },
  { id: 404, arabic: 'فَرَاشَة', transcription: 'faraashah', russian: 'бабочка', translations: ['бабочка'], semanticGroup: 'Животные', type: WORD_TYPES.noun, lessonId: TA_MARBUTA },
  { id: 405, arabic: 'عَائِشَة', transcription: '3aa2ishah', russian: 'Аиша', translations: ['Аиша'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: TA_MARBUTA },
  { id: 406, arabic: 'مُثْمِرَات', transcription: 'muthmiraat', russian: 'плодоносящие / плодотворные, жен. мн. ч.', translations: ['плодоносящие', 'плодотворные'], semanticGroup: 'Признаки', type: WORD_TYPES.noun, lessonId: TA_MARBUTA, root: 'ث م ر' },
  { id: 407, arabic: 'سَفِينَة', transcription: 'safiinah', russian: 'корабль / судно', translations: ['корабль', 'судно'], semanticGroup: 'Транспорт', type: WORD_TYPES.noun, lessonId: TA_MARBUTA },
  { id: 408, arabic: 'جَمْعِيَّة', transcription: 'jam3iyyah', russian: 'общество / ассоциация / организация', translations: ['общество', 'ассоциация', 'организация'], semanticGroup: 'Общество', type: WORD_TYPES.noun, lessonId: TA_MARBUTA },
  { id: 409, arabic: 'مَدْرَسَة', transcription: 'madrasah', russian: 'школа', translations: ['школа'], semanticGroup: 'Учёба и знания', type: WORD_TYPES.noun, lessonId: TA_MARBUTA, root: 'د ر س' },
  { id: 410, arabic: 'بَنَات', transcription: 'banaat', russian: 'девочки / дочери', translations: ['девочки', 'дочери'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: TA_MARBUTA, root: 'ب ن ي' },
  { id: 411, arabic: 'جَدِيدَة', transcription: 'jadiidah', russian: 'новая', translations: ['новая'], semanticGroup: 'Признаки', type: WORD_TYPES.noun, lessonId: TA_MARBUTA, root: 'ج د د' },
  { id: 412, arabic: 'طَارَتْ', transcription: 'Taarat', russian: 'она полетела / она летела', translations: ['она полетела', 'она летела'], semanticGroup: 'Движение', type: WORD_TYPES.verb, lessonId: TA_MARBUTA, root: 'ط ي ر' },
  { id: 501, arabic: 'صِدْق', transcription: 'Sidq', russian: 'правдивость / правда', translations: ['правдивость', 'правда'], semanticGroup: 'Общение и дух', type: WORD_TYPES.noun, lessonId: SOLAR_LUNAR, root: 'ص د ق' },
  { id: 502, arabic: 'وَلَد', transcription: 'walad', russian: 'мальчик', translations: ['мальчик'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: SOLAR_LUNAR },
  { id: 503, arabic: 'شَمَر', transcription: 'shamar', russian: 'фенхель', translations: ['фенхель'], semanticGroup: 'Растения', type: WORD_TYPES.noun, lessonId: SOLAR_LUNAR },
  { id: 504, arabic: 'حَجّ', transcription: 'Hajj', russian: 'хадж / паломничество', translations: ['хадж', 'паломничество'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: SOLAR_LUNAR, root: 'ح ج ج' },
  { id: 505, arabic: 'رُكُوع', transcription: 'rukuu3', russian: 'поясной поклон / рукуʿ', translations: ['поясной поклон', 'рукуʿ'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: SOLAR_LUNAR },
  { id: 506, arabic: 'صَبْر', transcription: 'Sabr', russian: 'терпение', translations: ['терпение'], semanticGroup: 'Общение и дух', type: WORD_TYPES.noun, lessonId: SOLAR_LUNAR },
  { id: 507, arabic: 'ذَهَب', transcription: 'dhahab', russian: 'золото', translations: ['золото'], semanticGroup: 'Материалы и ценности', type: WORD_TYPES.noun, lessonId: SOLAR_LUNAR },
  { id: 508, arabic: 'عَصْر', transcription: '3aSr', russian: 'послеполуденное время / эпоха', translations: ['послеполуденное время', 'эпоха'], semanticGroup: 'Время и события', type: WORD_TYPES.noun, lessonId: SOLAR_LUNAR },
  { id: 509, arabic: 'مَوَدَّة', transcription: 'mawaddah', russian: 'любовь / привязанность', translations: ['любовь', 'привязанность'], semanticGroup: 'Общение и дух', type: WORD_TYPES.noun, lessonId: SOLAR_LUNAR },
  { id: 601, arabic: 'أُذُن', transcription: '2udhun', russian: 'ухо', translations: ['ухо'], semanticGroup: 'Тело', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 602, arabic: 'بَطِّيخ', transcription: 'baTTiikh', russian: 'арбуз', translations: ['арбуз'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 603, arabic: 'تُفَّاح', transcription: 'tuffaaH', russian: 'яблоко / яблоки', translations: ['яблоко', 'яблоки'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 604, arabic: 'ثَوْم', transcription: 'thawm', russian: 'чеснок', translations: ['чеснок'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 605, arabic: 'جَزَر', transcription: 'jazar', russian: 'морковь', translations: ['морковь'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 606, arabic: 'حَافِلَة', transcription: 'Haafilah', russian: 'автобус', translations: ['автобус'], semanticGroup: 'Транспорт', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 607, arabic: 'خُبْز', transcription: 'khubz', russian: 'хлеб', translations: ['хлеб'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 608, arabic: 'دَرَّاجَة', transcription: 'darraajah', russian: 'велосипед', translations: ['велосипед'], semanticGroup: 'Транспорт', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 609, arabic: 'ذُرَة', transcription: 'dhurah', russian: 'кукуруза', translations: ['кукуруза'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 610, arabic: 'رُمَّان', transcription: 'rummaan', russian: 'гранат', translations: ['гранат'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 611, arabic: 'زَيْتُون', transcription: 'zaytuun', russian: 'оливки / маслины', translations: ['оливки', 'маслины'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 612, arabic: 'سَيَّارَة', transcription: 'sayyaarah', russian: 'машина / автомобиль', translations: ['машина', 'автомобиль'], semanticGroup: 'Транспорт', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 613, arabic: 'شَارِع', transcription: 'shaari3', russian: 'улица', translations: ['улица'], semanticGroup: 'Город и места', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH, root: 'ش ر ع' },
  { id: 614, arabic: 'صَلَاة', transcription: 'Salaah', russian: 'молитва / намаз', translations: ['молитва', 'намаз'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 615, arabic: 'ضَابِط', transcription: 'DaabiT', russian: 'офицер', translations: ['офицер'], semanticGroup: 'Люди', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 616, arabic: 'طَائِرَة', transcription: 'Taa2irah', russian: 'самолёт', translations: ['самолёт'], semanticGroup: 'Транспорт', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH, root: 'ط ي ر' },
  { id: 617, arabic: 'ظَرْف', transcription: 'DHarf', russian: 'конверт', translations: ['конверт'], semanticGroup: 'Быт и предметы', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 618, arabic: 'عِنَب', transcription: '3inab', russian: 'виноград', translations: ['виноград'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 619, arabic: 'غَسَّالَة', transcription: 'ghassaalah', russian: 'стиральная машина', translations: ['стиральная машина'], semanticGroup: 'Быт и предметы', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH, root: 'غ س ل' },
  { id: 620, arabic: 'فَرِيز', transcription: 'fariiz', russian: 'клубника', translations: ['клубника'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 621, arabic: 'قِطَار', transcription: 'qiTaar', russian: 'поезд', translations: ['поезд'], semanticGroup: 'Транспорт', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 622, arabic: 'كَعْبَة', transcription: 'ka3bah', russian: 'Кааба', translations: ['Кааба'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 623, arabic: 'لَيْمُون', transcription: 'laymuun', russian: 'лимон', translations: ['лимон'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 624, arabic: 'مَسْجِد', transcription: 'masjid', russian: 'мечеть', translations: ['мечеть'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH, root: 'س ج د' },
  { id: 625, arabic: 'نَخْلَة', transcription: 'nakhlah', russian: 'пальма', translations: ['пальма'], semanticGroup: 'Растения', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 626, arabic: 'هَاتِف', transcription: 'haatif', russian: 'телефон', translations: ['телефон'], semanticGroup: 'Быт и предметы', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 627, arabic: 'وُضُوء', transcription: 'wuDuu2', russian: 'омовение / вуду', translations: ['омовение', 'вуду'], semanticGroup: 'Вера и поклонение', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },
  { id: 628, arabic: 'يَقْطِين', transcription: 'yaqTiin', russian: 'тыква', translations: ['тыква'], semanticGroup: 'Еда и продукты', type: WORD_TYPES.noun, lessonId: PARTS_OF_SPEECH },

  { id: 701, arabic: 'مِنْ', transcription: 'min', russian: 'из / от', translations: ['из', 'от'], semanticGroup: 'Служебные слова', type: WORD_TYPES.particle, lessonId: PARTICLES_FROM_RULES },
  { id: 702, arabic: 'إِلَى', transcription: '2ilaa', russian: 'к / в направлении к', translations: ['к', 'в направлении к'], semanticGroup: 'Служебные слова', type: WORD_TYPES.particle, lessonId: PARTICLES_FROM_RULES },
  { id: 703, arabic: 'عَلَى', transcription: '3alaa', russian: 'на', translations: ['на'], semanticGroup: 'Служебные слова', type: WORD_TYPES.particle, lessonId: PARTICLES_FROM_RULES },
  { id: 704, arabic: 'فِي', transcription: 'fii', russian: 'в / внутри', translations: ['в', 'внутри'], semanticGroup: 'Служебные слова', type: WORD_TYPES.particle, lessonId: PARTICLES_FROM_RULES },
  { id: 705, arabic: 'وَ', transcription: 'wa', russian: 'и', translations: ['и'], semanticGroup: 'Служебные слова', type: WORD_TYPES.particle, lessonId: PARTICLES_FROM_RULES },
  { id: 706, arabic: 'لَا', transcription: 'laa', russian: 'не', translations: ['не'], semanticGroup: 'Служебные слова', type: WORD_TYPES.particle, lessonId: PARTICLES_FROM_RULES },
  { id: 707, arabic: 'لَمْ', transcription: 'lam', russian: 'не (прошедшее отрицание)', translations: ['не (прошедшее отрицание)'], semanticGroup: 'Служебные слова', type: WORD_TYPES.particle, lessonId: PARTICLES_FROM_RULES },
  { id: 708, arabic: 'لِ', transcription: 'li', russian: 'для / кому-либо / принадлежность', translations: ['для', 'кому-либо', 'принадлежность'], semanticGroup: 'Служебные слова', type: WORD_TYPES.particle, lessonId: PARTICLES_FROM_RULES },
  { id: 709, arabic: 'الْ', transcription: 'al-', russian: 'определённый артикль', translations: ['определённый артикль'], semanticGroup: 'Служебные слова', type: WORD_TYPES.particle, lessonId: PARTICLES_FROM_RULES },

  { id: 801, arabic: 'تَدْرِيب', transcription: 'tadriib', russian: 'тренировка', translations: ['тренировка'], semanticGroup: 'Учёба и навыки', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'د ر ب' },
  { id: 802, arabic: 'خَطَر', transcription: 'khatar', russian: 'риск', translations: ['риск'], semanticGroup: 'Общество', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'خ ط ر' },
  { id: 803, arabic: 'رِيَاضَة', transcription: 'riyaaDah', russian: 'спорт', translations: ['спорт'], semanticGroup: 'Спорт и здоровье', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ر و ض' },
  { id: 804, arabic: 'بَيْرَق', transcription: 'bayraq', russian: 'флаг', translations: ['флаг'], semanticGroup: 'Общество', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS },
  { id: 805, arabic: 'رَادِيُو', transcription: 'raadiyuu', russian: 'радио', translations: ['радио'], semanticGroup: 'Техника и медиа', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS },
  { id: 806, arabic: 'بَنْك', transcription: 'bank', russian: 'банк', translations: ['банк'], semanticGroup: 'Экономика', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS },
  { id: 807, arabic: 'كُمْبِيُوتَر', transcription: 'kumbiyuutar', russian: 'компьютер', translations: ['компьютер'], semanticGroup: 'Техника и медиа', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS },
  { id: 808, arabic: 'دُكْتُور', transcription: 'duktuur', russian: 'доктор', translations: ['доктор'], semanticGroup: 'Люди и профессии', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS },
  { id: 809, arabic: 'مَشْرُوع', transcription: 'mashruu3', russian: 'проект', translations: ['проект'], semanticGroup: 'Работа и идеи', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ش ر ع' },
  { id: 810, arabic: 'مَحْمُول', transcription: 'maHmuul', russian: 'мобильный телефон', translations: ['мобильный телефон'], semanticGroup: 'Техника и медиа', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ح م ل' },
  { id: 811, arabic: 'مُوَاصَلَات', transcription: 'muwaasalaat', russian: 'транспорт', translations: ['транспорт'], semanticGroup: 'Транспорт', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'و ص ل' },
  { id: 812, arabic: 'فِكْرَة', transcription: 'fikrah', russian: 'идея', translations: ['идея'], semanticGroup: 'Работа и идеи', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ف ك ر' },
  { id: 813, arabic: 'فُنْدُق', transcription: 'funduq', russian: 'отель', translations: ['отель'], semanticGroup: 'Город и места', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS },
  { id: 814, arabic: 'مُسْتَثْمِر', transcription: 'mustathmir', russian: 'инвестор', translations: ['инвестор'], semanticGroup: 'Люди и профессии', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ث م ر' },
  { id: 815, arabic: 'عَادَات', transcription: '3aadaat', russian: 'традиции', translations: ['традиции'], semanticGroup: 'Культура и общество', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ع و د' },
  { id: 816, arabic: 'عُقُوبَات', transcription: '3uquubaat', russian: 'санкции', translations: ['санкции'], semanticGroup: 'Политика и общество', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ع ق ب' },
  { id: 817, arabic: 'تَحَالُف', transcription: 'taHaaluf', russian: 'коалиция', translations: ['коалиция'], semanticGroup: 'Политика и общество', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ح ل ف' },
  { id: 818, arabic: 'نَبْض', transcription: 'nabD', russian: 'пульс', translations: ['пульс'], semanticGroup: 'Спорт и здоровье', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ن ب ض' },
  { id: 819, arabic: 'أَخْبَار', transcription: '2akhbaar', russian: 'новости', translations: ['новости'], semanticGroup: 'Техника и медиа', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'خ ب ر' },
  { id: 820, arabic: 'مَوْقِف', transcription: 'mawqif', russian: 'позиция', translations: ['позиция'], semanticGroup: 'Политика и общество', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'و ق ف' },
  { id: 821, arabic: 'مَحَطَّة', transcription: 'maHaTTah', russian: 'станция', translations: ['станция'], semanticGroup: 'Транспорт', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ح ط ط' },
  { id: 822, arabic: 'هِجْرَة', transcription: 'hijrah', russian: 'миграция', translations: ['миграция'], semanticGroup: 'Культура и общество', type: WORD_TYPES.noun, lessonId: FAMILIAR_SOUNDING_WORDS, root: 'ه ج ر' },

  { id: 901, arabic: 'أَنَا', transcription: '2anaa', russian: 'я', translations: ['я'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 902, arabic: 'نَحْنُ', transcription: 'naHnu', russian: 'мы', translations: ['мы'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 903, arabic: 'أَنْتَ', transcription: 'anta', russian: 'ты, мужчина', translations: ['ты', 'мужчина'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 904, arabic: 'أَنْتِ', transcription: 'anti', russian: 'ты, женщина', translations: ['ты', 'женщина'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 905, arabic: 'أَنْتُمَا', transcription: 'antumaa', russian: 'вы двое / вы две', translations: ['вы двое', 'вы две'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 906, arabic: 'أَنْتُمْ', transcription: 'antum', russian: 'вы, мужчины или смешанная группа', translations: ['вы', 'мужчины или смешанная группа'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 907, arabic: 'أَنْتُنَّ', transcription: 'antunna', russian: 'вы, женщины', translations: ['вы', 'женщины'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 908, arabic: 'هُوَ', transcription: 'huwa', russian: 'он', translations: ['он'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 909, arabic: 'هِيَ', transcription: 'hiya', russian: 'она', translations: ['она'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 910, arabic: 'هُمَا', transcription: 'humaa', russian: 'они двое / они две', translations: ['они двое', 'они две'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 911, arabic: 'هُمْ', transcription: 'hum', russian: 'они, мужчины или смешанная группа', translations: ['они', 'мужчины или смешанная группа'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS },
  { id: 912, arabic: 'هُنَّ', transcription: 'hunna', russian: 'они, женщины', translations: ['они', 'женщины'], semanticGroup: 'Личные местоимения', type: WORD_TYPES.noun, lessonId: PERSONAL_PRONOUNS }
];

const FEMININE_NOUN_IDS = new Set([
  204, 206, 209, 211,
  402, 403, 404, 405, 406, 407, 408, 409, 410, 411,
  509,
  601, 606, 608, 609, 612, 614, 616, 619, 622, 625,
  803, 811, 812, 815, 816, 821, 822,
  904, 907, 909, 912
]);

const COMMON_GENDER_NOUN_IDS = new Set([901, 902, 905, 910]);

const AUDIO_READY_TRANSCRIPTIONS = new Set([
  'dakhala', 'kharaja', 'waqafa', 'jalasa', 'nazala', 'sakana', 'Hajaza',
  'Talaba', 'Taraqa', 'DHahara', 'sabaHa', 'shariba', '2akala', 'ghasala',
  'labisa', 'mariDa', 'fariHa', 'fahima', 'HafiDHa', 'darasa', '3alima',
  'qara2a', 'kataba', '2akhadha', 'waDa3a', 'masaka', 'Hamala', 'dafa3a',
  'rabaTa', 'hadama', 'faqada', 'wajada', '3amila', 'rasama', 'nafakha',
  'Daraba', 'Hakama', 'naDHara', 'sakata', 'shakara', 'Hamida', 'sajada',
  'maghrib', 'daftar', 'mawz', 'wardah', 'muslim', 'bint', 'muHammad',
  'yaHujju', 'sinn', 'Saddaqa', 'jannah', 'kadhdhaba', 'kitaab', 'kuub',
  '3iid', '2islaam', '2usbuu3', 'jadiid', 'allaah', 'qaalat', 'muslimaat',
  'kabiirah', 'faraashah', '3aa2ishah', 'muthmiraat', 'safiinah',
  'jam3iyyah', 'madrasah', 'banaat', 'jadiidah', 'Taarat', 'Sidq', 'walad',
  'shamar', 'Hajj', 'rukuu3', 'Sabr', 'dhahab', '3aSr', 'mawaddah',
  '2udhun', 'baTTiikh', 'tuffaaH', 'thawm', 'jazar', 'Haafilah', 'khubz',
  'darraajah', 'dhurah', 'rummaan', 'zaytuun', 'sayyaarah', 'shaari3',
  'Salaah', 'DaabiT', 'Taa2irah', 'DHarf', '3inab', 'ghassaalah', 'fariiz',
  'qiTaar', 'ka3bah', 'laymuun', 'masjid', 'nakhlah', 'haatif', 'wuDuu2',
  'yaqTiin', 'min', '2ilaa', '3alaa', 'fii', 'wa', 'laa', 'lam', 'li', 'al-'
]);

export const WORDS_DATA = WORDS_BASE.map((word) => ({
  ...word,
  group: LESSON_BY_ID[word.lessonId].label,
  gender: word.type === WORD_TYPES.noun
    ? FEMININE_NOUN_IDS.has(word.id)
      ? WORD_GENDERS.feminine
      : COMMON_GENDER_NOUN_IDS.has(word.id)
        ? WORD_GENDERS.common
        : WORD_GENDERS.masculine
    : null,
  audio: AUDIO_READY_TRANSCRIPTIONS.has(word.transcription)
    ? `/audio/${word.transcription}.mp3`
    : null
}));
