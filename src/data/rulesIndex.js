import demonstrativePronounsContent from '../content/rules/demonstrative-pronouns.md?raw';
import hamzaContent from '../content/rules/hamza.md?raw';
import interrogativeWordsContent from '../content/rules/interrogative-words.md?raw';
import maddContent from '../content/rules/madd.md?raw';
import partsOfSpeechContent from '../content/rules/parts-of-speech.md?raw';
import personalPronounsContent from '../content/rules/personal-pronouns.md?raw';
import pronounsContent from '../content/rules/pronouns.md?raw';
import shaddaContent from '../content/rules/shadda.md?raw';
import solarLunarContent from '../content/rules/solar-lunar.md?raw';
import sukunContent from '../content/rules/sukun.md?raw';
import taMarbutaContent from '../content/rules/ta-marbuta.md?raw';
import lettersContent from '../content/rules/letters.md?raw';

export const RULE_CATEGORIES = {
  reading: 'Чтение и произношение',
  endings: 'Буквы и окончания',
  grammar: 'Грамматика'
};

export const RULES = [
  {
    id: 'letters',
    order: 0,
    title: 'Буквы',
    arabicTitle: 'الحُرُوف العَرَبِيَّة',
    symbol: 'أ ب ت',
    readMinutes: 3,
    category: RULE_CATEGORIES.reading,
    summary: 'Все 28 букв арабского алфавита с русскими названиями и озвучкой.',
    keywords: ['буквы', 'алфавит', 'арабский алфавит', 'произношение', 'алиф', 'باء', 'أ ب ت'],
    content: lettersContent
  },
  {
    id: 'sukun',
    order: 1,
    title: 'Сукун',
    arabicTitle: 'السُّكُون',
    symbol: 'ْ',
    readMinutes: 1,
    category: RULE_CATEGORIES.reading,
    summary: 'Отсутствие короткой гласной после согласной.',
    keywords: ['огласовка', 'тишина', 'неподвижная буква', 'ْ'],
    content: sukunContent
  },
  {
    id: 'shadda',
    order: 2,
    title: 'Шадда',
    arabicTitle: 'الشَّدَّة',
    symbol: 'ّ',
    readMinutes: 1,
    category: RULE_CATEGORIES.reading,
    summary: 'Удвоение и удержание согласного звука.',
    keywords: ['удвоение', 'согласная', 'ّ'],
    content: shaddaContent
  },
  {
    id: 'ta-marbuta',
    order: 3,
    title: 'Та марбута и та мафтуха',
    arabicTitle: 'التَّاء الْمَرْبُوطَة وَالْمَفْتُوحَة',
    symbol: 'ة ت',
    readMinutes: 2,
    category: RULE_CATEGORIES.endings,
    summary: 'Две формы буквы «та» в конце слова и их произношение.',
    keywords: ['женский род', 'окончание', 'открытая та', 'связанная та', 'ة', 'ت'],
    content: taMarbutaContent
  },
  {
    id: 'madd',
    order: 4,
    title: 'Удлинение — мадд',
    arabicTitle: 'المَدّ',
    symbol: 'آ',
    readMinutes: 2,
    category: RULE_CATEGORIES.reading,
    summary: 'Долгие гласные ā, ū и ī и буквы удлинения.',
    keywords: ['удлинение', 'долгая гласная', 'ударение', 'алиф', 'вав', 'йа', 'آ', 'ا', 'و', 'ي'],
    content: maddContent
  },
  {
    id: 'solar-lunar',
    order: 5,
    title: 'Солнечные и лунные буквы',
    arabicTitle: 'الْحُرُوف الشَّمْسِيَّة وَالْقَمَرِيَّة',
    symbol: 'ال',
    icon: 'solar-lunar',
    readMinutes: 3,
    category: RULE_CATEGORIES.reading,
    summary: 'Произношение артикля ال перед солнечными и лунными буквами.',
    keywords: ['артикль', 'определённость', 'солнечные буквы', 'лунные буквы', 'хамзат аль-васль', 'اللام الشمسية', 'اللام القمرية', 'ال'],
    content: solarLunarContent
  },
  {
    id: 'pronouns',
    order: 6,
    title: 'Местоимения',
    arabicTitle: 'الضَّمَائِر',
    symbol: 'هُوَ',
    readMinutes: 7,
    category: RULE_CATEGORIES.grammar,
    summary: 'Общая карта указательных, личных и слитных местоимений.',
    keywords: ['местоимения', 'личные местоимения', 'указательные местоимения', 'слитные местоимения', 'ضمائر', 'هُوَ', 'هِيَ', 'أَنَا'],
    content: pronounsContent
  },
  {
    id: 'demonstrative-pronouns',
    order: 7,
    title: 'Указательные местоимения',
    arabicTitle: 'أَسْمَاء الإِشَارَة',
    symbol: 'هٰذَا',
    readMinutes: 5,
    category: RULE_CATEGORIES.grammar,
    summary: 'Формы «этот», «эта», «эти» и согласование с существительным.',
    keywords: ['этот', 'эта', 'эти', 'местоимения', 'род', 'число', 'هٰذَا', 'هٰذِهِ', 'هٰؤُلَاءِ'],
    content: demonstrativePronounsContent
  },
  {
    id: 'personal-pronouns',
    order: 8,
    title: 'Личные местоимения',
    arabicTitle: 'الضَّمَائِر الشَّخْصِيَّة',
    symbol: 'أَنَا',
    readMinutes: 5,
    category: RULE_CATEGORIES.grammar,
    summary: 'Все 14 позиций личных местоимений и полная схема прошедшего времени.',
    keywords: ['я', 'мы', 'ты', 'вы', 'он', 'она', 'они', 'двое', 'спряжение', 'прошедшее время', 'أَنَا', 'نَحْنُ', 'أَنْتُمَا', 'هُمَا', 'هُنَّ'],
    content: personalPronounsContent
  },
  {
    id: 'interrogative-words',
    order: 9,
    title: 'Вопросительные слова в арабском языке',
    arabicTitle: 'أَدَوَاتُ الِاسْتِفْهَامِ',
    symbol: 'مَنْ؟',
    readMinutes: 6,
    category: RULE_CATEGORIES.grammar,
    summary: 'Кто, что, где, когда, почему, как, сколько и общие вопросы.',
    keywords: ['вопрос', 'кто', 'что', 'где', 'когда', 'почему', 'как', 'сколько', 'чей', 'куда', 'откуда', 'مَنْ', 'مَا', 'أَيْنَ', 'هَلْ'],
    content: interrogativeWordsContent
  },
  {
    id: 'hamza',
    order: 10,
    title: 'Хамза',
    arabicTitle: 'الهَمْزَة',
    symbol: 'ء',
    readMinutes: 6,
    category: RULE_CATEGORIES.reading,
    summary: 'Отдельный звук хамзы и выбор её написания в слове.',
    keywords: ['хамза', 'алиф', 'огласовка', 'ء', 'أ', 'ؤ', 'ئ'],
    content: hamzaContent
  },
  {
    id: 'parts-of-speech',
    order: 11,
    title: 'Части речи в арабском',
    arabicTitle: 'أَقْسَام الكَلَام',
    symbol: 'ا ف ح',
    readMinutes: 8,
    category: RULE_CATEGORIES.grammar,
    summary: 'Имя, глагол и частица — три основные категории арабской грамматики.',
    keywords: ['части речи', 'имя', 'глагол', 'частица', 'اِسْمٌ', 'فِعْلٌ', 'حَرْفٌ'],
    content: partsOfSpeechContent
  }
].sort((left, right) => left.order - right.order);

export const RULE_BY_ID = Object.fromEntries(
  RULES.map((rule) => [rule.id, rule])
);

const normalizeSearchValue = (value) => (
  String(value ?? '')
    .toLocaleLowerCase('ru')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .trim()
);

export const filterRules = (rules, query) => {
  const normalizedQuery = normalizeSearchValue(query);
  if (!normalizedQuery) return rules;

  return rules.filter((rule) => normalizeSearchValue([
    rule.title,
    rule.arabicTitle,
    rule.symbol,
    rule.category,
    rule.summary,
    ...rule.keywords,
    rule.content
  ].join(' ')).includes(normalizedQuery));
};
