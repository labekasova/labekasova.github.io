import { readFile, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);

const [lettersArticle, rulesLibrary, appSource] = await Promise.all([
  readFile(new URL('../src/content/rules/letters.md', import.meta.url), 'utf8'),
  readFile(new URL('../src/features/rules/RulesLibrary.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
]);

const localVideoPath = new URL('../public/video/arabic-alphabet-song.mp4', import.meta.url);
const hasLocalVideo = await stat(localVideoPath).then((file) => file.size > 0).catch(() => false);
const posterPath = new URL('../public/images/arabic-alphabet-song-poster.png', import.meta.url);
const hasPoster = await stat(posterPath).then((file) => file.size > 0).catch(() => false);
const videoDuration = await execFileAsync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nokey=1:noprint_wrappers=1', fileURLToPath(localVideoPath)])
  .then(({ stdout }) => Number.parseFloat(stdout.trim()))
  .catch(() => Number.NaN);

const requiredChecks = [
  [lettersArticle.includes('[[letters-video]]'), 'В статье «Буквы» нет маркера видео.'],
  [hasLocalVideo, 'Локальный MP4 с песней отсутствует или пустой.'],
  [videoDuration > 139.4 && videoDuration < 140.4, 'Видео не обрезано на первые четыре секунды.'],
  [hasPoster, 'Файл превью для видео отсутствует или пустой.'],
  [rulesLibrary.includes('src="/video/arabic-alphabet-song.mp4"'), 'Статья не использует локальное видео.'],
  [rulesLibrary.includes('poster="/images/arabic-alphabet-song-poster.png"'), 'Плееру не назначено превью.'],
  [rulesLibrary.includes('isVideoStarted') && rulesLibrary.includes('Запустить песню для арабского алфавита'), 'Превью не запускает видео по нажатию.'],
  [rulesLibrary.includes('controls={isVideoStarted}') && rulesLibrary.includes('playsInline'), 'Элементы управления не скрыты до запуска видео.'],
  [!rulesLibrary.includes('youtube-nocookie.com'), 'В статье осталась внешняя зависимость от YouTube для воспроизведения видео.'],
  [rulesLibrary.includes('https://www.youtube.com/channel/UCjVyBC2fCbSnVj3zi8wlOag'), 'В карточке видео нет ссылки на канал автора.'],
  [appSource.includes('isDictionaryScrollTopVisible'), 'В словаре нет состояния для кнопки возврата вверх.'],
  [appSource.includes('aria-label="Вернуться к началу словаря"'), 'У кнопки словаря нет понятной подписи для доступности.'],
  [appSource.includes("rounded-xl border shadow-lg transition-all duration-200 motion-reduce:transition-none"), 'Кнопка словаря отличается от кнопки в правилах.'],
  [appSource.includes('d="m17 11-5-5-5 5"') && appSource.includes('d="m17 18-5-5-5 5"'), 'Стрелки словаря не совпадают по геометрии с кнопкой правил.'],
  [appSource.includes('mainRef.current?.scrollTo({ top: 0, behavior: \'smooth\' })'), 'Кнопка словаря не прокручивает основной контейнер наверх.']
];

const failures = requiredChecks.filter(([passed]) => !passed).map(([, message]) => message);

if (failures.length > 0) {
  throw new Error(`Проверка улучшений справочника не пройдена:\n- ${failures.join('\n- ')}`);
}

console.log('Проверены видео в статье «Буквы» и кнопка возврата вверх в словаре.');
