import demonstrativePronounsContent from '../content/rules/demonstrative-pronouns.md?raw';
import hamzaContent from '../content/rules/hamza.md?raw';
import maddContent from '../content/rules/madd.md?raw';
import partsOfSpeechContent from '../content/rules/parts-of-speech.md?raw';
import personalPronounsContent from '../content/rules/personal-pronouns.md?raw';
import shaddaContent from '../content/rules/shadda.md?raw';
import solarLunarContent from '../content/rules/solar-lunar.md?raw';
import sukunContent from '../content/rules/sukun.md?raw';
import taMarbutaContent from '../content/rules/ta-marbuta.md?raw';

export const RULE_CATEGORIES = {
  reading: 'Чтение и произношение',
  endings: 'Буквы и окончания',
  grammar: 'Грамматика'
};

export const RULES = [
  {
    id: 'sukun',
    order: 1,
    title: 'Сукун',
    arabicTitle: 'السُّكُونُ',
    symbol: 'ْ',
    category: RULE_CATEGORIES.reading,
    summary: 'Отсутствие короткой гласной после согласной.',
    keywords: ['огласовка', 'тишина', 'неподвижная буква', 'ْ'],
    content: sukunContent
  },
  {
    id: 'shadda',
    order: 2,
    title: 'Шадда',
    arabicTitle: 'الشَّدَّةُ',
    symbol: 'ّ',
    category: RULE_CATEGORIES.reading,
    summary: 'Удвоение и удержание согласного звука.',
    keywords: ['удвоение', 'согласная', 'ّ'],
    content: shaddaContent
  },
  {
    id: 'ta-marbuta',
    order: 3,
    title: 'Та марбута и та мафтуха',
    arabicTitle: 'التَّاءُ الْمَرْبُوطَةُ وَالْمَفْتُوحَةُ',
    symbol: 'ة ت',
    category: RULE_CATEGORIES.endings,
    summary: 'Две формы буквы «та» в конце слова и их произношение.',
    keywords: ['женский род', 'окончание', 'открытая та', 'связанная та', 'ة', 'ت'],
    content: taMarbutaContent
  },
  {
    id: 'madd',
    order: 4,
    title: 'Удлинение — мадд',
    arabicTitle: 'المَدُّ',
    symbol: 'آ',
    category: RULE_CATEGORIES.reading,
    summary: 'Долгие гласные ā, ū и ī и буквы удлинения.',
    keywords: ['удлинение', 'долгая гласная', 'ударение', 'алиф', 'вав', 'йа', 'آ', 'ا', 'و', 'ي'],
    content: maddContent
  },
  {
    id: 'solar-lunar',
    order: 5,
    title: 'Солнечные и лунные буквы',
    arabicTitle: 'الْحُرُوفُ الشَّمْسِيَّةُ وَالْقَمَرِيَّةُ',
    symbol: 'ال',
    icon: 'solar-lunar',
    category: RULE_CATEGORIES.reading,
    summary: 'Произношение артикля ال перед солнечными и лунными буквами.',
    keywords: ['артикль', 'определённость', 'солнечные буквы', 'лунные буквы', 'хамзат аль-васль', 'اللام الشمسية', 'اللام القمرية', 'ال'],
    content: solarLunarContent
  },
  {
    id: 'demonstrative-pronouns',
    order: 6,
    title: 'Указательные местоимения',
    arabicTitle: 'أَسْمَاءُ الإِشَارَةِ',
    symbol: 'هٰذَا',
    category: RULE_CATEGORIES.grammar,
    summary: 'Формы «этот», «эта», «эти» и согласование с существительным.',
    keywords: ['этот', 'эта', 'эти', 'местоимения', 'род', 'число', 'هٰذَا', 'هٰذِهِ', 'هٰؤُلَاءِ'],
    content: demonstrativePronounsContent
  },
  {
    id: 'personal-pronouns',
    order: 7,
    title: 'Личные местоимения',
    arabicTitle: 'الضَّمَائِرُ الشَّخْصِيَّةُ',
    symbol: 'أَنَا',
    category: RULE_CATEGORIES.grammar,
    summary: 'Я, мы, ты, он и она и формы прошедшего времени.',
    keywords: ['я', 'мы', 'ты', 'он', 'она', 'спряжение', 'прошедшее время', 'أَنَا', 'نَحْنُ', 'هُوَ', 'هِيَ'],
    content: personalPronounsContent
  },
  {
    id: 'hamza',
    order: 8,
    title: 'Хамза',
    arabicTitle: 'الهَمْزَةُ',
    symbol: 'ء',
    category: RULE_CATEGORIES.reading,
    summary: 'Отдельный звук хамзы и выбор её написания в слове.',
    keywords: ['хамза', 'алиф', 'огласовка', 'ء', 'أ', 'ؤ', 'ئ'],
    content: hamzaContent
  },
  {
    id: 'parts-of-speech',
    order: 9,
    title: 'Части речи в арабском',
    arabicTitle: 'أَقْسَامُ الكَلَامِ',
    symbol: 'ا ف ح',
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
