import { readFile } from 'node:fs/promises';

const languageModulePath = new URL('../src/data/ruleLanguage.js', import.meta.url);
const rulesIndexPath = new URL('../src/data/rulesIndex.js', import.meta.url);

const languageModule = await import(languageModulePath.href);
const indexSource = await readFile(rulesIndexPath, 'utf8');

const expectedRuleIds = [
  'sukun',
  'shadda',
  'ta-marbuta',
  'madd',
  'solar-lunar',
  'demonstrative-pronouns',
  'personal-pronouns',
  'hamza',
  'parts-of-speech'
];

for (const ruleId of expectedRuleIds) {
  if (!indexSource.includes(`id: '${ruleId}'`)) {
    throw new Error(`Правило ${ruleId} отсутствует в индексе.`);
  }

  const item = languageModule.RULE_TITLE_LANGUAGE[ruleId];
  if (!item) {
    throw new Error(`Для заголовка правила ${ruleId} нет отдельной языковой записи.`);
  }

  for (const field of ['arabic', 'transcription', 'russian', 'audio']) {
    if (!item[field]) {
      throw new Error(`В записи ${ruleId} не заполнено поле ${field}.`);
    }
  }

  if (!item.audio.startsWith('/audio/rules/')) {
    throw new Error(`Аудио заголовка ${ruleId} должно храниться отдельно от словаря.`);
  }
}

const normalized = languageModule.normalizeRuleTranscription('al-ḥurūfu ash-shamsīyatu');
if (normalized !== 'al-Huruufu ash-shamsiiyatu') {
  throw new Error(`Нормализация транскрипции вернула «${normalized}» вместо ожидаемого формата приложения.`);
}

for (const ending of ['t', 'ta', 'ti', 'tu', 'naa']) {
  const suffixAudio = languageModule.createRuleLanguageItem({
    arabic: 'ت',
    transcription: `-${ending}`
  }).audio;
  const standaloneAudio = languageModule.createRuleLanguageItem({
    arabic: 'ت',
    transcription: ending
  }).audio;

  if (suffixAudio !== standaloneAudio) {
    throw new Error(`Окончания «${ending}» и «-${ending}» должны использовать один аудиофайл.`);
  }
}

if (languageModule.getRuleLanguageAudio('min') !== '/audio/rules/min.mp3') {
  throw new Error('Пример в правилах должен брать локальную копию min.mp3 из папки rules.');
}
if (languageModule.createRuleLanguageItem({ arabic: 'مِنْ', transcription: 'min' }).isDictionaryAudio) {
  throw new Error('Локальная копия min.mp3 не должна учитываться как аудио словаря.');
}

console.log(`Проверено языковых заголовков правил: ${expectedRuleIds.length}.`);
