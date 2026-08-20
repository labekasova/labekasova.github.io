import { readFile } from 'node:fs/promises';

const sourcePath = new URL('../src/content/rules/hamza.md', import.meta.url);
const source = await readFile(sourcePath, 'utf8');
const mismatchedTanwinForms = [
  'تَكَافُؤٌ', 'لُؤْلُؤٌ', 'تَنَبُّؤٌ', 'هَادِئٌ', 'شَاطِئٌ', 'مُنْشِئٌ', 'مُبْتَدِئٌ',
  'دِفْءٌ', 'جُزْءٌ', 'عِبْءٌ', 'سَمَاءٌ', 'دُعَاءٌ', 'رَجَاءٌ', 'وُضُوءٌ', 'بَرِيءٌ',
  'مَلِيءٌ', 'رَدِيءٌ'
];

for (const form of mismatchedTanwinForms) {
  if (source.includes(form)) {
    throw new Error(`В паузной транскрипции остался несогласованный танвин: ${form}.`);
  }
}

console.log(`Проверено паузных форм в статье о хамзе: ${mismatchedTanwinForms.length}.`);
