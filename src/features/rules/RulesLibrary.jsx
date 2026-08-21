import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpenText, ChevronLeft, ChevronRight, ChevronsUp, Languages, ListTree, Moon, Play, Search, Sun, Volume2, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createRuleLanguageItem, RULE_TITLE_LANGUAGE } from '../../data/ruleLanguage.js';
import { filterRules, RULE_BY_ID, RULES } from '../../data/rulesIndex.js';
import ReferenceSwitch from './ReferenceSwitch.jsx';

const getTextContent = (children) => (
  React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      if (React.isValidElement(child)) return getTextContent(child.props.children);
      return '';
    })
    .join('')
);

const ARABIC_PATTERN = /[\u0600-\u06FF]/;
const CYRILLIC_PATTERN = /[А-Яа-яЁё]/;
const TRANSCRIPTION_PATTERN = /^[a-zA-Z0-9āīūḥḫḏšṣḍṭẓġʿʾʔʻ’‘ʼ\-\s]+$/;

const ARABIC_LETTERS = [
  ['ا', 'Алиф', 'aa', 'долгий гласный «а»', 'alif'], ['ب', 'Ба', 'b', 'обычный звук «б»', 'baa'],
  ['ت', 'Та', 't', 'обычный звук «т»', 'taa'], ['ث', 'Са', 'th', 'межзубный звук, как английское th в think', 'thaa'],
  ['ج', 'Джим', 'j', 'звук «дж»', 'jiim'], ['ح', 'Ха', 'H', 'глубокий гортанный звук «х»', 'haa-deep'],
  ['خ', 'Ха', 'kh', 'грубый гортанный звук «х»', 'khaa'], ['د', 'Даль', 'd', 'обычный звук «д»', 'daal'],
  ['ذ', 'Заль', 'dh', 'межзубный звук, как английское th в this', 'dhaal'], ['ر', 'Ра', 'r', 'раскатистый звук «р»', 'raa'],
  ['ز', 'За', 'z', 'обычный звук «з»', 'zaay'], ['س', 'Син', 's', 'обычный звук «с»', 'siin'],
  ['ش', 'Шин', 'sh', 'обычный звук «ш»', 'shiin'], ['ص', 'Сад', 'S', 'твёрдый звук «с»', 'Saad'],
  ['ض', 'Дад', 'D', 'твёрдый звук «д»', 'Daad'], ['ط', 'Та', 'T', 'твёрдый звук «т»', 'taa-emphatic'],
  ['ظ', 'За', 'DH', 'твёрдый межзубный звук «з»', 'DHaa'], ['ع', 'Айн', '3', 'особый гортанный звук, которого нет в русском', '3ayn'],
  ['غ', 'Гайн', 'gh', 'гортанный звук, близкий к французскому r', 'ghayn'], ['ف', 'Фа', 'f', 'обычный звук «ф»', 'faa'],
  ['ق', 'Каф', 'q', 'глубокий звук «к»', 'qaaf'], ['ك', 'Кяф', 'k', 'обычный звук «к»', 'kaaf'],
  ['ل', 'Лям', 'l', 'обычный звук «л»', 'laam'], ['م', 'Мим', 'm', 'обычный звук «м»', 'miim'],
  ['ن', 'Нун', 'n', 'обычный звук «н»', 'nuun'], ['ه', 'Ха', 'h', 'лёгкий выдох, как английское h', 'haa-light'],
  ['و', 'Вау', 'uu / w', 'долгий «у» или согласный «в»', 'waaw'], ['ي', 'Йа', 'ii / y', 'долгий «и» или согласный «й»', 'yaa']
].map(([arabic, name, transcription, hint, fileName]) => ({
  arabic, name, transcription, hint, audio: `/audio/letters/${fileName}.mp3`
}));

const parseLanguageEntry = (text) => {
  const segments = String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/\s+—\s+/);

  if (segments.length < 2) return null;

  const firstSegment = segments[0].trim();
  const sectionLabel = firstSegment.match(/^(\d+)\.\s+/)?.[1] ?? null;
  const arabic = firstSegment.replace(/^\d+\.\s+/, '').trim();
  const transcription = segments[1].trim();
  const russian = segments.slice(2).join(' — ').trim();

  if (!ARABIC_PATTERN.test(arabic) || CYRILLIC_PATTERN.test(arabic)) return null;
  if (!TRANSCRIPTION_PATTERN.test(transcription) || CYRILLIC_PATTERN.test(transcription)) return null;
  if (ARABIC_PATTERN.test(russian)) return null;

  return {
    ...createRuleLanguageItem({ arabic, transcription, russian }),
    sectionLabel
  };
};

const extractStandaloneLanguageBlocks = (content) => {
  const toMarker = (match, entry) => (
    entry
      ? `[[rule-language|${entry.arabic}|${entry.transcription}|${entry.russian}]]`
      : match
  );

  const withInlineTranscription = content.replace(
    /^\*\*([^*\n]*[\u0600-\u06FF][^*\n]*)\*\*[ \t]*\r?\n([^\n]+)$/gm,
    (match, languageLine, russian) => {
      if (/^\*[^*]+\*$/.test(russian.trim())) return match;
      return toMarker(match, parseLanguageEntry(`${languageLine} — ${russian}`));
    }
  );

  return withInlineTranscription.replace(
    /^\*\*([^*\n]*[\u0600-\u06FF][^*\n]*)\*\*[ \t]*\r?\n\*([^*\n]+)\*[ \t]*\r?\n([^\n]+)$/gm,
    (match, arabic, transcription, russian) => {
      if (russian.trim().endsWith(':')) return match;
      return toMarker(match, parseLanguageEntry(`${arabic} — ${transcription} — ${russian}`));
    }
  );
};

const splitRuleContent = (content) => (
  extractStandaloneLanguageBlocks(content)
    .split(/(\[\[rule-language\|[^\]]+\]\])/)
    .filter(Boolean)
);

const formatArticleCount = (count) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const form = lastTwoDigits >= 11 && lastTwoDigits <= 14
    ? 'статей'
    : lastDigit === 1
      ? 'статья'
      : lastDigit >= 2 && lastDigit <= 4
        ? 'статьи'
        : 'статей';

  return `${count} ${form}`;
};

function RuleSymbol({ rule, theme, compact = false }) {
  const sizeClasses = compact ? 'h-12 w-12' : 'h-14 w-14';
  const textSizeClasses = compact ? 'text-2xl' : 'text-[2rem]';
  const colorClasses = theme === 'dark'
    ? 'bg-slate-800 text-indigo-200'
    : 'bg-indigo-50 text-indigo-700';

  if (rule.icon === 'solar-lunar') {
    const iconSize = compact ? 19 : 22;

    return (
      <span className={`flex ${sizeClasses} shrink-0 items-center justify-center gap-0.5 rounded-lg ${colorClasses}`}>
        <Sun size={iconSize} className="text-amber-500" aria-hidden="true" />
        <Moon size={iconSize} className={theme === 'dark' ? 'text-indigo-200' : 'text-indigo-600'} aria-hidden="true" />
      </span>
    );
  }

  if (rule.id === 'parts-of-speech') {
    return (
      <span className={`flex ${sizeClasses} shrink-0 items-center justify-center rounded-lg ${colorClasses}`}>
        <ListTree size={compact ? 20 : 23} strokeWidth={2.1} aria-hidden="true" />
      </span>
    );
  }

  if (rule.id === 'letters') {
    return (
      <span className={`flex ${sizeClasses} shrink-0 items-center justify-center rounded-lg ${colorClasses}`}>
        <Languages size={compact ? 20 : 23} strokeWidth={2.1} aria-hidden="true" />
      </span>
    );
  }

  return (
    <span
      className={`arabic-text flex ${sizeClasses} ${textSizeClasses} shrink-0 items-center justify-center rounded-lg font-bold ${colorClasses}`}
      dir="rtl"
    >
      {rule.symbol}
    </span>
  );
}

function RuleAudioTrigger({ item, activeAudioPath, onPlayAudio, theme }) {
  if (!item) return null;

  if (!item.audio) {
    return (
      <span className={`inline-flex min-h-8 items-center px-2 text-sm font-medium ${
        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
      }`}>
        [{item.transcription}]
      </span>
    );
  }

  const isActive = activeAudioPath === item.audio;

  return (
    <button
      type="button"
      onClick={() => onPlayAudio(item.audio)}
      className={`inline-flex min-h-8 items-center gap-1 rounded-md px-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
        isActive
          ? theme === 'dark'
            ? 'bg-indigo-500/20 text-white shadow-sm shadow-indigo-500/20'
            : 'bg-indigo-100 text-indigo-800 shadow-sm shadow-indigo-200'
          : theme === 'dark'
            ? 'text-indigo-200 hover:bg-slate-800 hover:text-white'
            : 'text-indigo-700 hover:bg-indigo-50 hover:text-indigo-900'
      }`}
      aria-label={`Прослушать: ${item.transcription}`}
      aria-pressed={isActive}
    >
      <span>[{item.transcription}]</span>
      <Volume2 className={`relative top-px h-3.5 w-3.5 ${isActive ? 'animate-pulse' : ''}`} aria-hidden="true" />
      <span className="sr-only">Прослушать</span>
    </button>
  );
}

function RuleLanguageCard({ item, activeAudioPath, onPlayAudio, theme, compact = false }) {
  return (
    <section className={`my-5 rounded-xl border px-4 py-4 text-center ${
      theme === 'dark'
        ? 'border-slate-700 bg-slate-800/70'
        : 'border-slate-200 bg-slate-50/80'
    }`}>
      <p className={`arabic-text mb-1 break-words text-[1.9rem] font-semibold leading-[1.55] ${
        theme === 'dark' ? 'text-indigo-100' : 'text-slate-800'
      }`} dir="rtl">
        {item.arabic}
      </p>
      <RuleAudioTrigger
        item={item}
        activeAudioPath={activeAudioPath}
        onPlayAudio={onPlayAudio}
        theme={theme}
      />
      {item.russian && !compact && (
        <p className={`mt-1 text-sm leading-5 ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {item.russian}
        </p>
      )}
    </section>
  );
}

function ArabicLettersGrid({ activeAudioPath, onPlayAudio, theme }) {
  const [selectedLetter, setSelectedLetter] = useState(ARABIC_LETTERS[0]);

  return (
    <section className="my-7" aria-label="Арабские буквы с озвучкой">
      <div
        className={`letters-help mb-3 ${theme === 'dark' ? 'border-slate-700 bg-slate-800 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}
        role="status"
        title={`${selectedLetter.name}: ${selectedLetter.hint}`}
      >
        <strong className="arabic-text shrink-0 text-lg" dir="rtl">{selectedLetter.arabic}</strong>
        <span className="truncate"><strong>{selectedLetter.name}</strong> — {selectedLetter.hint}</span>
      </div>
      <div className="letters-grid">
        {ARABIC_LETTERS.map((letter) => {
          const isActive = selectedLetter.arabic === letter.arabic;
          return (
            <button
              key={letter.arabic}
              type="button"
              onClick={() => {
                setSelectedLetter(letter);
                onPlayAudio(letter.audio);
              }}
              aria-label={`Прослушать букву ${letter.name}: ${letter.transcription}.`}
              aria-pressed={isActive}
              className={`letters-tile ${theme === 'dark'
                ? 'border-slate-700 bg-slate-800 text-slate-100 hover:border-indigo-400 hover:bg-slate-700'
                : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50'
              } ${isActive ? 'letters-tile-playing' : ''}`}
            >
              <span className={`arabic-text text-[2rem] font-bold leading-none ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-700'}`} dir="rtl">{letter.arabic}</span>
              <span className={`mt-1.5 text-[0.72rem] font-bold leading-4 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{letter.name}</span>
              <span className={`mt-0.5 text-xs font-semibold leading-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>[{letter.transcription}]</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ArabicAlphabetVideo({ theme }) {
  const videoRef = useRef(null);
  const [isVideoStarted, setIsVideoStarted] = useState(false);

  const startVideo = async () => {
    await videoRef.current?.play();
  };

  return (
    <section className={`my-8 overflow-hidden rounded-2xl border shadow-sm ${
      theme === 'dark'
        ? 'border-slate-700 bg-slate-800/70'
        : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="px-4 pb-4 pt-5 sm:px-5">
        <p className={`text-xs font-bold uppercase tracking-[0.16em] ${
          theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
        }`}>
          Учим на слух
        </p>
        <h3 className="mt-1 text-lg font-bold leading-6">Песня для арабского алфавита</h3>
        <p className={`mt-1 text-sm leading-5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          Повторяйте буквы вместе с песней — так легче запомнить их порядок и звучание.
        </p>
      </div>
      <div className={`border-t p-2 sm:p-3 ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-white/80'}`}>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-900">
          <video
            ref={videoRef}
            className="h-full w-full"
            src="/video/arabic-alphabet-song.mp4"
            poster="/images/arabic-alphabet-song-poster.png"
            controls={isVideoStarted}
            playsInline
            preload="metadata"
            onPlay={() => setIsVideoStarted(true)}
          >
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
          {!isVideoStarted && (
            <button
              type="button"
              onClick={startVideo}
              aria-label="Запустить песню для арабского алфавита"
              className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/5 transition-colors hover:bg-slate-950/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 pl-1 text-white shadow-lg shadow-slate-950/30 transition-transform duration-200 hover:scale-105 active:scale-95">
                <Play size={30} fill="currentColor" aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
        <p className={`px-1 pt-2 text-[11px] leading-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
          Автор видео:{' '}
          <a
            href="https://www.youtube.com/channel/UCjVyBC2fCbSnVj3zi8wlOag"
            target="_blank"
            rel="noreferrer"
            className={`underline underline-offset-2 ${theme === 'dark' ? 'hover:text-slate-300' : 'hover:text-slate-600'}`}
          >
            Subhan Muslim
          </a>
        </p>
      </div>
    </section>
  );
}

const getMarkdownComponents = ({ theme, activeAudioPath, onPlayAudio }) => ({
  h2: ({ children }) => {
    const text = getTextContent(children);
    const HeadingIcon = /^Лунные буквы/i.test(text)
      ? Moon
      : /^Солнечные буквы/i.test(text)
        ? Sun
        : null;

    return (
      <h2 className="mb-3 mt-8 flex items-start gap-2 text-xl font-bold leading-7 sm:mt-9">
        {HeadingIcon && (
          <HeadingIcon
            size={23}
            className={`mt-0.5 shrink-0 ${
              HeadingIcon === Sun
                ? 'text-amber-500'
                : theme === 'dark'
                  ? 'text-indigo-200'
                  : 'text-indigo-600'
            }`}
            aria-hidden="true"
          />
        )}
        <span>{children}</span>
      </h2>
    );
  },
  h3: ({ children }) => {
    const text = getTextContent(children);
    const languageEntry = parseLanguageEntry(text);

    if (languageEntry) {
      return (
        <section className="mt-7">
          {languageEntry.sectionLabel && (
            <h3 className="mb-2 text-base font-bold leading-6">{languageEntry.sectionLabel}</h3>
          )}
          <RuleLanguageCard
            item={languageEntry}
            activeAudioPath={activeAudioPath}
            onPlayAudio={onPlayAudio}
            theme={theme}
          />
        </section>
      );
    }

    return <h3 className="mb-2 mt-7 text-base font-bold leading-6">{children}</h3>;
  },
  p: ({ children }) => {
    const text = getTextContent(children);
    const languageEntry = parseLanguageEntry(text);

    if (languageEntry) {
      return (
        <RuleLanguageCard
          item={languageEntry}
          activeAudioPath={activeAudioPath}
          onPlayAudio={onPlayAudio}
          theme={theme}
        />
      );
    }

    return (
      <p className="mb-4 text-base leading-[1.7] sm:text-[17px]">
        {children}
      </p>
    );
  },
  strong: ({ children }) => {
    const text = getTextContent(children);
    const languageEntry = parseLanguageEntry(text);
    const containsArabic = /[\u0600-\u06FF]/.test(text);
    const isSukunAccent = text === 'Сукун' || text === 'ْ';

    if (languageEntry) {
      return (
        <span className="inline-flex flex-wrap items-center gap-x-1 align-baseline">
          <span className="arabic-text text-[1.15em] font-bold" dir="rtl">{languageEntry.arabic}</span>
          <RuleAudioTrigger
            item={languageEntry}
            activeAudioPath={activeAudioPath}
            onPlayAudio={onPlayAudio}
            theme={theme}
          />
          {languageEntry.russian && <span className="font-normal">— {languageEntry.russian}</span>}
        </span>
      );
    }

    return (
      <strong className={`font-bold ${
        containsArabic ? 'arabic-text text-[1.2em]' : ''
      } ${
        isSukunAccent ? (theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600') : ''
      }`}>
        {children}
      </strong>
    );
  },
  em: ({ children }) => <em className="font-medium not-italic text-indigo-600">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className={`font-semibold underline decoration-2 underline-offset-2 transition-colors ${
        theme === 'dark'
          ? 'text-indigo-300 decoration-indigo-500/60 hover:text-indigo-200'
          : 'text-indigo-700 decoration-indigo-300 hover:text-indigo-900'
      }`}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="mb-5 list-disc space-y-2.5 pl-6 text-base leading-[1.65] sm:text-[17px]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2.5 pl-6 text-base leading-[1.65] sm:text-[17px]">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  table: ({ children }) => (
    <div className={`mb-6 w-full overflow-x-auto border ${
      theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
    }`}>
      <table className="min-w-[560px] border-collapse text-left text-[15px] leading-6">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className={theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}>{children}</thead>
  ),
  th: ({ children }) => (
    <th className={`border-b px-3 py-2.5 font-bold ${
      theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
    }`}>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className={`border-b px-3 py-2.5 align-top ${
      theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
    }`}>
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className={`my-6 border-l-4 border-amber-400 px-4 py-3 text-[16px] leading-7 ${
        theme === 'dark' ? 'bg-amber-500/10 text-amber-100' : 'bg-amber-50 text-slate-700'
      }`}
    >
      {children}
    </blockquote>
  )
});

function RuleContent({ content, theme, activeAudioPath, onPlayAudio }) {
  return splitRuleContent(content).flatMap((block) => block.split(/(\[\[letters-(?:grid|video)\]\])/)).filter(Boolean).map((block, index) => {
    if (block === '[[letters-grid]]') {
      return <ArabicLettersGrid key={`letters-grid-${index}`} activeAudioPath={activeAudioPath} onPlayAudio={onPlayAudio} theme={theme} />;
    }
    if (block === '[[letters-video]]') {
      return <ArabicAlphabetVideo key={`letters-video-${index}`} theme={theme} />;
    }
    const languageMatch = block.match(/^\[\[rule-language\|([^|]+)\|([^|]+)\|(.+)\]\]$/);

    if (languageMatch) {
      const [, arabic, transcription, russian] = languageMatch;
      const item = createRuleLanguageItem({ arabic, transcription, russian });

      return (
        <RuleLanguageCard
          key={`language-${index}`}
          item={item}
          activeAudioPath={activeAudioPath}
          onPlayAudio={onPlayAudio}
          theme={theme}
        />
      );
    }

    return (
      <ReactMarkdown
        key={`markdown-${index}`}
        remarkPlugins={[remarkGfm]}
        components={getMarkdownComponents({ theme, activeAudioPath, onPlayAudio })}
      >
        {block}
      </ReactMarkdown>
    );
  });
}

function RuleArticle({ ruleId, onBack, onOpenRule, theme }) {
  const rule = RULE_BY_ID[ruleId];
  const audioRef = useRef(null);
  const navigationRef = useRef(null);
  const [activeAudioPath, setActiveAudioPath] = useState(null);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [scrollTopBottomOffset, setScrollTopBottomOffset] = useState(0);

  useEffect(() => () => {
    audioRef.current?.pause();
  }, []);

  useEffect(() => {
    audioRef.current?.pause();
    setActiveAudioPath(null);
  }, [ruleId]);

  useEffect(() => {
    const articleScrollContainer = document.querySelector('.app-main');
    const updateScrollTopVisibility = () => {
      const scrollPosition = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        articleScrollContainer?.scrollTop ?? 0
      );
      const navigationTop = navigationRef.current?.getBoundingClientRect().top;
      const navigationOffset = navigationTop && navigationTop > 0 && navigationTop < window.innerHeight
        ? Math.ceil(window.innerHeight - navigationTop + 16)
        : 0;
      setIsScrollTopVisible(scrollPosition > 240);
      setScrollTopBottomOffset((currentOffset) => (
        currentOffset === navigationOffset ? currentOffset : navigationOffset
      ));
    };

    updateScrollTopVisibility();
    window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
    articleScrollContainer?.addEventListener('scroll', updateScrollTopVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollTopVisibility);
      articleScrollContainer?.removeEventListener('scroll', updateScrollTopVisibility);
    };
  }, [ruleId]);

  const playRuleAudio = (audioPath) => {
    if (!audioPath) return;

    audioRef.current?.pause();

    const audio = new Audio(audioPath);
    audioRef.current = audio;
    setActiveAudioPath(audioPath);
    audio.onended = () => setActiveAudioPath((currentPath) => (
      currentPath === audioPath ? null : currentPath
    ));
    audio.onerror = () => setActiveAudioPath((currentPath) => (
      currentPath === audioPath ? null : currentPath
    ));
    audio.play().catch(() => setActiveAudioPath((currentPath) => (
      currentPath === audioPath ? null : currentPath
    )));
  };

  const scrollToArticleTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.querySelector('.app-main')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!rule) {
    return (
      <div className="mx-auto flex min-h-[50dvh] max-w-md flex-col items-center justify-center text-center">
        <BookOpenText size={36} className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'} />
        <h2 className="mt-4 text-xl font-bold">Правило не найдено</h2>
        <button
          type="button"
          onClick={onBack}
          className="mt-5 min-h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white"
        >
          Вернуться к правилам
        </button>
      </div>
    );
  }

  const ruleIndex = RULES.findIndex((item) => item.id === rule.id);
  const previousRule = ruleIndex > 0 ? RULES[ruleIndex - 1] : null;
  const nextRule = ruleIndex < RULES.length - 1 ? RULES[ruleIndex + 1] : null;
  const titleLanguage = RULE_TITLE_LANGUAGE[rule.id];

  return (
    <article className="mx-auto w-full max-w-[760px] pb-4">
      <button
        type="button"
        onClick={onBack}
        className={`mb-5 flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold ${
          theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
        }`}
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Все правила
      </button>

      <header className={`border-b pb-6 ${
        theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
          <RuleSymbol rule={rule} theme={theme} />
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className={`text-xs font-semibold uppercase ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
              }`}>
                {rule.category}
              </p>
              <span
                className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-slate-100 text-slate-500'
                }`}
                title={`Примерное время чтения: ${rule.readMinutes} мин`}
              >
                ≈ {rule.readMinutes} мин
              </span>
            </div>
            <h1 className="mt-1 text-xl font-bold leading-7 sm:text-2xl sm:leading-8">{rule.title}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className={`arabic-text break-words text-xl leading-8 ${
                theme === 'dark' ? 'text-indigo-200' : 'text-indigo-700'
              }`} dir="rtl">
                {rule.arabicTitle}
              </p>
              <RuleAudioTrigger
                item={titleLanguage}
                activeAudioPath={activeAudioPath}
                onPlayAudio={playRuleAudio}
                theme={theme}
              />
            </div>
          </div>
        </div>
        <p className={`mt-4 text-base leading-7 ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {rule.summary}
        </p>
      </header>

      <div className="min-w-0 py-2">
        <RuleContent
          content={rule.content}
          theme={theme}
          activeAudioPath={activeAudioPath}
          onPlayAudio={playRuleAudio}
        />
      </div>

      <nav
        ref={navigationRef}
        className={`mt-8 grid gap-3 border-t pt-5 sm:grid-cols-2 ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
        }`}
        aria-label="Соседние правила"
      >
        {previousRule ? (
          <button
            type="button"
            onClick={() => onOpenRule(previousRule.id)}
            className={`flex min-h-14 items-center gap-2 rounded-lg border px-3 text-left text-sm font-semibold ${
              theme === 'dark' ? 'border-slate-700 text-slate-200' : 'border-slate-200 text-slate-700'
            }`}
          >
            <ChevronLeft size={18} className="shrink-0" aria-hidden="true" />
            <span className="min-w-0">{previousRule.title}</span>
          </button>
        ) : <span aria-hidden="true" />}
        {nextRule && (
          <button
            type="button"
            onClick={() => onOpenRule(nextRule.id)}
            className={`flex min-h-14 items-center justify-end gap-2 rounded-lg border px-3 text-right text-sm font-semibold ${
              theme === 'dark' ? 'border-slate-700 text-slate-200' : 'border-slate-200 text-slate-700'
            }`}
          >
            <span className="min-w-0">{nextRule.title}</span>
            <ChevronRight size={18} className="shrink-0" aria-hidden="true" />
          </button>
        )}
      </nav>

      <button
        type="button"
        onClick={scrollToArticleTop}
        aria-label="Вернуться к началу статьи"
        style={{ transform: isScrollTopVisible ? `translateY(-${scrollTopBottomOffset}px)` : 'translateY(0.75rem)' }}
        className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg transition-all duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
          isScrollTopVisible
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        } ${
          theme === 'dark'
            ? 'border-slate-600 bg-slate-800/95 text-indigo-200 shadow-slate-950/30 hover:bg-slate-700'
            : 'border-indigo-100 bg-white/95 text-indigo-600 shadow-indigo-950/15 hover:bg-indigo-50'
        }`}
      >
        <ChevronsUp size={21} strokeWidth={2.4} aria-hidden="true" />
      </button>
    </article>
  );
}

export default function RulesLibrary({
  selectedRuleId,
  onOpenRule,
  onBackToRules,
  onReferenceChange,
  theme
}) {
  const [query, setQuery] = useState('');
  const visibleRules = useMemo(() => filterRules(RULES, query), [query]);

  if (selectedRuleId) {
    return (
      <RuleArticle
        ruleId={selectedRuleId}
        onBack={onBackToRules}
        onOpenRule={onOpenRule}
        theme={theme}
      />
    );
  }

  return (
    <section className="reference-layout w-full">
      <div className={`reference-toolbar sticky top-0 z-[5] border-b ${
        theme === 'dark'
          ? 'border-slate-800 bg-slate-900'
          : 'border-slate-100 bg-white'
      }`}>
        <div className="reference-controls">
          <ReferenceSwitch activeView="rules" onChange={onReferenceChange} theme={theme} />
          <label className="relative mt-3 block lg:mt-0">
          <span className={`pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <Search size={20} aria-hidden="true" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Название, термин или пример"
            autoComplete="off"
            aria-label="Поиск по правилам"
            className={`min-h-12 w-full rounded-xl border py-2 pl-11 pr-11 text-base outline-none transition-colors ${
              theme === 'dark'
                ? 'border-slate-700 bg-slate-800 text-slate-100 focus:border-indigo-400'
                : 'border-slate-200 bg-slate-50 text-slate-800 focus:border-indigo-500'
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Очистить поиск правил"
              className={`absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              <X size={20} aria-hidden="true" />
            </button>
          )}
          </label>
        </div>

        <p className={`mt-3 text-sm ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
        }`} aria-live="polite">
          Найдено: {formatArticleCount(visibleRules.length)}
        </p>
      </div>

      {visibleRules.length > 0 ? (
        <ul className="reference-results-grid">
          {visibleRules.map((rule) => (
            <li key={rule.id} className={`border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
              <button
                type="button"
                onClick={() => onOpenRule(rule.id)}
                className="flex min-h-[7.5rem] w-full min-w-0 items-center gap-4 py-4 text-left sm:py-5"
              >
                <RuleSymbol rule={rule} theme={theme} compact />
                <span className="min-w-0 flex-1">
                  <span className={`block text-xs font-semibold uppercase ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {rule.category}
                  </span>
                  <span className="mt-1 block text-base font-bold leading-6">{rule.title}</span>
                  <span className={`arabic-text mt-0.5 block break-words text-base leading-6 ${
                    theme === 'dark' ? 'text-indigo-200' : 'text-indigo-700'
                  }`} dir="rtl">
                    {rule.arabicTitle}
                  </span>
                  <span className={`mt-1 block text-sm leading-5 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {rule.summary}
                  </span>
                </span>
                <ArrowRight size={20} className="shrink-0 text-slate-400" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex min-h-[42dvh] flex-col items-center justify-center px-5 text-center">
          <BookOpenText size={36} className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'} />
          <h2 className="mt-4 text-xl font-bold">Правило не найдено</h2>
          <p className={`mt-2 text-sm leading-6 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Измените запрос или очистите поиск.
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-5 min-h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white"
          >
            Очистить поиск
          </button>
        </div>
      )}
    </section>
  );
}
