import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  createRuleLanguageItem,
  getRuleAudioFileName,
  RULE_TITLE_LANGUAGE
} from '../src/data/ruleLanguage.js';

const ARABIC_PATTERN = /[\u0600-\u06FF]/;
const CYRILLIC_PATTERN = /[А-Яа-яЁё]/;
const TRANSCRIPTION_PATTERN = /^[a-zA-Z0-9āīūḥḫḏšṣḍṭẓġʿʾʔʻ’‘ʼ\-\s]+$/;

const parseLanguageEntry = (text) => {
  const segments = String(text ?? '')
    .replace(/^#{1,6}\s+/, '')
    .replace(/\*+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/\s+—\s+/);

  if (segments.length < 2) return null;

  const arabic = segments[0].replace(/^\d+\.\s+/, '').trim();
  const transcription = segments[1].trim();
  const russian = segments.slice(2).join(' — ').trim();

  if (!ARABIC_PATTERN.test(arabic) || CYRILLIC_PATTERN.test(arabic)) return null;
  if (!TRANSCRIPTION_PATTERN.test(transcription) || CYRILLIC_PATTERN.test(transcription)) return null;
  if (ARABIC_PATTERN.test(russian)) return null;

  return createRuleLanguageItem({ arabic, transcription, russian });
};

const collectEntries = (content, source, entries) => {
  const collect = (entry) => {
    if (entry) entries.push({ ...entry, source });
  };

  const withInlineTranscription = content.replace(
    /^\*\*([^*\n]*[\u0600-\u06FF][^*\n]*)\*\*[ \t]*\r?\n([^\n]+)$/gm,
    (match, languageLine, russian) => {
      if (/^\*[^*]+\*$/.test(russian.trim())) return match;
      const entry = parseLanguageEntry(`${languageLine} — ${russian}`);
      collect(entry);
      return entry ? '' : match;
    }
  );

  const withoutMultilineEntries = withInlineTranscription.replace(
    /^\*\*([^*\n]*[\u0600-\u06FF][^*\n]*)\*\*[ \t]*\r?\n\*([^*\n]+)\*[ \t]*\r?\n([^\n]+)$/gm,
    (match, arabic, transcription, russian) => {
      if (russian.trim().endsWith(':')) return match;
      const entry = parseLanguageEntry(`${arabic} — ${transcription} — ${russian}`);
      collect(entry);
      return entry ? '' : match;
    }
  );

  for (const line of withoutMultilineEntries.split(/\r?\n/)) {
    collect(parseLanguageEntry(line));

    for (const match of line.matchAll(/\*\*([^*]+)\*\*/g)) {
      collect(parseLanguageEntry(match[1]));
    }
  }
};

const entries = Object.entries(RULE_TITLE_LANGUAGE).map(([source, entry]) => ({ ...entry, source }));
const rulesDirectory = 'src/content/rules';
const ruleFiles = (await readdir(rulesDirectory)).filter((file) => file.endsWith('.md')).sort();

for (const fileName of ruleFiles) {
  const content = await readFile(join(rulesDirectory, fileName), 'utf8');
  collectEntries(content, fileName, entries);
}

const uniqueEntries = [...new Map(entries.map((entry) => [entry.audio, entry])).values()];
const dictionaryEntries = uniqueEntries.filter((entry) => entry.isDictionaryAudio);
const ruleEntries = uniqueEntries.filter((entry) => !entry.isDictionaryAudio);

console.log(`Всего уникальных озвучиваемых фрагментов: ${uniqueEntries.length}.`);
console.log(`Уже берут аудио из словаря: ${dictionaryEntries.length}.`);
console.log(`Нужно сгенерировать для раздела правил: ${ruleEntries.length}.`);
console.log('');
console.log('Файл | Арабский | Транскрипция | Перевод');

for (const entry of ruleEntries) {
  console.log(`${getRuleAudioFileName(entry.transcription)} | ${entry.arabic} | ${entry.transcription} | ${entry.russian || '—'}`);
}
