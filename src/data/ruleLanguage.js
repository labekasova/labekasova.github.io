import { WORDS_DATA } from './words.js';

const TRANSCRIPTION_REPLACEMENTS = {
  ā: 'aa',
  ī: 'ii',
  ū: 'uu',
  ḥ: 'H',
  ḫ: 'kh',
  ḏ: 'dh',
  š: 'sh',
  ṣ: 'S',
  ḍ: 'D',
  ṭ: 'T',
  ẓ: 'DH',
  ġ: 'gh',
  ʿ: '3',
  ʾ: '2',
  ʔ: '2',
  ʻ: '2',
  '’': '2',
  '‘': '2',
  'ʼ': '2'
};

const WORD_AUDIO_BY_TRANSCRIPTION = new Map(
  WORDS_DATA.map((word) => [word.transcription, word.audio]).filter(([, audio]) => audio)
);

const RULE_AUDIO_TRANSCRIPTION_ALIASES = new Map([
  ['-t', 't'],
  ['-ta', 'ta'],
  ['-ti', 'ti'],
  ['-tu', 'tu'],
  ['-naa', 'naa']
]);

const RULE_LOCAL_AUDIO_TRANSCRIPTIONS = new Set([
  '2ilaa', '3alaa', 'al-', 'bint', 'dakhala', 'darasa', 'fii', 'jalasa',
  'kataba', 'kharaja', 'kitaab', 'laa', 'lam', 'li', 'madrasah', 'min',
  'qara2a', 'shariba', 'wa', 'wuDuu2'
]);

export const normalizeRuleTranscription = (value) => (
  String(value ?? '')
    .trim()
    .replace(/[āīūḥḫḏšṣḍṭẓġʿʾʔʻ’‘ʼ]/g, (symbol) => TRANSCRIPTION_REPLACEMENTS[symbol])
    .replace(/^anaa(?=\s|$)/, '2anaa')
    .replace(/\s+/g, ' ')
);

export const getRuleAudioFileName = (transcription) => (
  (RULE_AUDIO_TRANSCRIPTION_ALIASES.get(normalizeRuleTranscription(transcription))
    ?? normalizeRuleTranscription(transcription))
    .replace(/[^a-zA-Z0-9-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .concat('.mp3')
);

const ruleAudioPath = (transcription) => `/audio/rules/${getRuleAudioFileName(transcription)}`;

export const RULE_TITLE_LANGUAGE = {
  letters: {
    arabic: 'الحُرُوف العَرَبِيَّة',
    transcription: 'al-Huruuf al-3arabiyyah',
    russian: 'арабские буквы',
    audio: '/audio/letters/al-Huruuf_al-3arabiyyah.mp3'
  },
  sukun: {
    arabic: 'السُّكُون',
    transcription: 'as-sukuun',
    russian: 'сукун',
    audio: ruleAudioPath('as-sukuun')
  },
  shadda: {
    arabic: 'الشَّدَّة',
    transcription: 'ash-shaddah',
    russian: 'шадда',
    audio: ruleAudioPath('ash-shaddah')
  },
  'ta-marbuta': {
    arabic: 'التَّاء الْمَرْبُوطَة وَالْمَفْتُوحَة',
    transcription: 'at-taa2 al-marbuuTah wa-l-maftuuHah',
    russian: 'та марбута и та мафтуха',
    audio: ruleAudioPath('at-taa2 al-marbuuTah wa-l-maftuuHah')
  },
  madd: {
    arabic: 'المَدّ',
    transcription: 'al-madd',
    russian: 'мадд',
    audio: ruleAudioPath('al-madd')
  },
  'solar-lunar': {
    arabic: 'الْحُرُوف الشَّمْسِيَّة وَالْقَمَرِيَّة',
    transcription: 'al-Huruuf ash-shamsiyyah wa-l-qamariyyah',
    russian: 'солнечные и лунные буквы',
    audio: ruleAudioPath('al-Huruuf ash-shamsiyyah wa-l-qamariyyah')
  },
  'demonstrative-pronouns': {
    arabic: 'أَسْمَاء الإِشَارَة',
    transcription: 'asmaa2 al-ishaara',
    russian: 'указательные местоимения',
    audio: ruleAudioPath('asmaa2 al-ishaara')
  },
  'personal-pronouns': {
    arabic: 'الضَّمَائِر الشَّخْصِيَّة',
    transcription: 'aD-Damaa2ir ash-shakhsiyyah',
    russian: 'личные местоимения',
    audio: ruleAudioPath('aD-Damaa2ir ash-shakhsiyyah')
  },
  hamza: {
    arabic: 'الهَمْزَة',
    transcription: 'al-hamzah',
    russian: 'хамза',
    audio: ruleAudioPath('al-hamzah')
  },
  'parts-of-speech': {
    arabic: 'أَقْسَام الكَلَام',
    transcription: 'aqsaam al-kalaam',
    russian: 'части речи',
    audio: ruleAudioPath('aqsaam al-kalaam')
  }
};

export const getRuleLanguageAudio = (transcription) => {
  const normalized = normalizeRuleTranscription(transcription);
  if (RULE_LOCAL_AUDIO_TRANSCRIPTIONS.has(normalized)) {
    return ruleAudioPath(normalized);
  }
  return WORD_AUDIO_BY_TRANSCRIPTION.get(normalized) ?? ruleAudioPath(normalized);
};

export const createRuleLanguageItem = ({ arabic, transcription, russian = '' }) => {
  const normalizedTranscription = normalizeRuleTranscription(transcription);

  return {
    arabic: String(arabic ?? '').trim(),
    transcription: normalizedTranscription,
    russian: String(russian ?? '').trim(),
    audio: getRuleLanguageAudio(normalizedTranscription),
    isDictionaryAudio: !RULE_LOCAL_AUDIO_TRANSCRIPTIONS.has(normalizedTranscription)
      && WORD_AUDIO_BY_TRANSCRIPTION.has(normalizedTranscription)
  };
};
