import { readFile } from 'node:fs/promises';

const source = await readFile('src/features/rules/RulesLibrary.jsx', 'utf8');

const requiredFragments = [
  "const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);",
  "window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });",
  "aria-label=\"Вернуться к началу статьи\"",
  "window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });",
  "const navigationRef = useRef(null);",
  "const [scrollTopBottomOffset, setScrollTopBottomOffset] = useState(0);",
  "ref={navigationRef}",
  "style={{ transform:",
  "ListTree",
  "grid-cols-[auto_minmax(0,1fr)]",
  "flex flex-wrap items-center gap-x-3 gap-y-1",
  "isActive ? 'animate-pulse' : ''",
  "bg-indigo-500/20 text-white shadow-sm shadow-indigo-500/20",
  "</div>\n        <p className={`mt-4 text-base leading-7"
];

const missingFragments = requiredFragments.filter((fragment) => !source.includes(fragment));

if (missingFragments.length) {
  throw new Error(`В интерфейсе статьи отсутствуют обязательные элементы: ${missingFragments.join(', ')}`);
}

console.log('Проверены кнопка возврата, заголовок статьи и символ частей речи.');
