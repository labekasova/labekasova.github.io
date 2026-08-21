import { readFileSync } from 'node:fs';

const appSource = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');

const requiredFragments = [
  'const playWordAudio = async (word) => {',
  'className={`dictionary-audio-trigger',
  'onClick={() => playWordAudio(word)}',
  'aria-label={`Прослушать произношение: ${word.arabic}`}',
  'const isDictionaryAudioActive = Boolean(word.audio) && activeAudioPath === word.audio;',
  '{word.audio ? (',
  '<span>[{word.transcription}]</span>',
  '<IconVolume className="relative top-px h-3.5 w-3.5" />'
];

const missingFragments = requiredFragments.filter((fragment) => !appSource.includes(fragment));
if (missingFragments.length > 0) {
  throw new Error(`В словаре нет ожидаемой кнопки озвучки: ${missingFragments.join(', ')}`);
}

console.log('Кнопка озвучки в словаре подключена.');
