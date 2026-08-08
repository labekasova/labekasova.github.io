import maddContent from '../content/rules/madd.md?raw';
import shaddaContent from '../content/rules/shadda.md?raw';
import sukunContent from '../content/rules/sukun.md?raw';
import taMarbutaContent from '../content/rules/ta-marbuta.md?raw';

export const RULE_CATEGORIES = {
  reading: 'Чтение и произношение',
  endings: 'Буквы и окончания'
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
