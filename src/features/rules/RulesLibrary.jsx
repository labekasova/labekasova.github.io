import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpenText, ChevronLeft, ChevronRight, Moon, Search, Sun, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

const isArabicExample = (text) => (
  /[\u0600-\u06FF]/.test(text) && !/[А-Яа-яЁё]/.test(text)
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

  return (
    <span
      className={`arabic-text flex ${sizeClasses} ${textSizeClasses} shrink-0 items-center justify-center rounded-lg font-bold ${colorClasses}`}
      dir="rtl"
    >
      {rule.symbol}
    </span>
  );
}

const getMarkdownComponents = (theme) => ({
  h2: ({ children }) => {
    const text = getTextContent(children);
    const HeadingIcon = /^Лунные буквы/i.test(text)
      ? Moon
      : /^Солнечные буквы/i.test(text)
        ? Sun
        : null;

    return (
      <h2 className="mb-3 mt-9 flex items-start gap-2 text-xl font-bold leading-7">
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
  h3: ({ children }) => (
    <h3 className="mb-2 mt-7 text-base font-bold leading-6">{children}</h3>
  ),
  p: ({ children }) => {
    const text = getTextContent(children);
    const arabicExample = isArabicExample(text);

    return (
      <p
        dir={arabicExample ? 'auto' : undefined}
        className={`mb-4 ${
          arabicExample
            ? 'arabic-text text-[1.7rem] font-semibold leading-[1.8]'
            : 'text-[17px] leading-[1.7]'
        }`}
      >
        {children}
      </p>
    );
  },
  strong: ({ children }) => {
    const text = getTextContent(children);
    const containsArabic = /[\u0600-\u06FF]/.test(text);

    return (
      <strong className={containsArabic ? 'arabic-text text-[1.2em] font-bold' : 'font-bold'}>
        {children}
      </strong>
    );
  },
  em: ({ children }) => <em className="font-medium not-italic text-indigo-600">{children}</em>,
  ul: ({ children }) => <ul className="mb-5 list-disc space-y-2.5 pl-6 text-[17px] leading-[1.65]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2.5 pl-6 text-[17px] leading-[1.65]">{children}</ol>,
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

function RuleArticle({ ruleId, onBack, onOpenRule, theme }) {
  const rule = RULE_BY_ID[ruleId];

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

  return (
    <article className="mx-auto w-full max-w-[680px]">
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
        <div className="flex min-w-0 items-start gap-4">
          <RuleSymbol rule={rule} theme={theme} />
          <div className="min-w-0">
            <p className={`text-xs font-semibold uppercase ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
            }`}>
              {rule.category}
            </p>
            <h1 className="mt-1 text-2xl font-bold leading-8">{rule.title}</h1>
            <p className={`arabic-text mt-1 break-words text-xl leading-8 ${
              theme === 'dark' ? 'text-indigo-200' : 'text-indigo-700'
            }`} dir="rtl">
              {rule.arabicTitle}
            </p>
          </div>
        </div>
        <p className={`mt-4 text-base leading-7 ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {rule.summary}
        </p>
      </header>

      <div className="min-w-0 py-2">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={getMarkdownComponents(theme)}
        >
          {rule.content}
        </ReactMarkdown>
      </div>

      <nav
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
    <section className="w-full">
      <div className={`sticky top-0 z-[5] -mx-5 -mt-5 border-b px-5 pb-3 pt-5 ${
        theme === 'dark'
          ? 'border-slate-800 bg-slate-900'
          : 'border-slate-100 bg-white'
      }`}>
        <ReferenceSwitch activeView="rules" onChange={onReferenceChange} theme={theme} />

        <label className="relative mt-3 block">
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

        <p className={`mt-3 text-sm ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
        }`} aria-live="polite">
          Найдено: {formatArticleCount(visibleRules.length)}
        </p>
      </div>

      {visibleRules.length > 0 ? (
        <ul className={`divide-y ${
          theme === 'dark' ? 'divide-slate-800' : 'divide-slate-200'
        }`}>
          {visibleRules.map((rule) => (
            <li key={rule.id}>
              <button
                type="button"
                onClick={() => onOpenRule(rule.id)}
                className="flex min-h-[7.5rem] w-full min-w-0 items-center gap-4 py-4 text-left"
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
