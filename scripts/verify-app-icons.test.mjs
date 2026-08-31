import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');

test('использует Lucide для всех общих иконок приложения', () => {
  const lucideImport = appSource.match(/import \{([\s\S]*?)\} from 'lucide-react';/);
  assert.ok(lucideImport, 'Должен быть импорт из lucide-react');

  for (const icon of [
    'ArrowLeft', 'ArrowRight', 'Book', 'BookOpenText', 'Brain', 'ChevronDown',
    'ChevronsUp', 'Eye', 'Moon', 'PenLine', 'RotateCcw', 'Search', 'Shuffle',
    'SlidersHorizontal', 'Sun', 'Volume2'
  ]) {
    assert.match(lucideImport[1], new RegExp(`\\b${icon}\\b`));
  }

  for (const name of [
    'IconBook', 'IconBrain', 'IconPen', 'IconArrowLeft', 'IconArrowRight',
    'IconShuffle', 'IconRotateCcw', 'IconEye', 'IconVolume', 'IconMoon',
    'IconSun', 'IconChevronDown', 'IconDictionary', 'IconSearch',
    'IconSliders', 'IconChevronsUp'
  ]) {
    assert.doesNotMatch(appSource, new RegExp(`const ${name}\\s*=`));
  }
});
