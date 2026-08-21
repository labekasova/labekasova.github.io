import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { LESSON_BY_ID } from '../../data/lessons.js';
import { TOPIC_BY_ID } from '../../data/topics.js';
import { filterPhrases, sortPhrasesByRussian } from '../../domain/phraseSelectors.js';
import PhraseFilters from './PhraseFilters.jsx';

export default function PhraseLibrary({
  phrases,
  theme,
  topicIds,
  lessonIds,
  onTopicIdsChange,
  onLessonIdsChange
}) {
  const [query, setQuery] = useState('');
  const visiblePhrases = useMemo(() => sortPhrasesByRussian(filterPhrases(phrases, { query })), [phrases, query]);

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Все фразы</h1>
        <p className={'mt-1 text-sm ' + (theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>
          Поиск по арабскому тексту, переводу или транскрипции
        </p>
      </div>

      <label className={'flex min-h-12 items-center gap-3 rounded-lg border px-3 ' + (
        theme === 'dark'
          ? 'border-slate-700 bg-slate-800 text-slate-200'
          : 'border-slate-200 bg-slate-50 text-slate-700'
      )}>
        <Search size={20} className="shrink-0 text-slate-400" aria-hidden="true" />
        <span className="sr-only">Найти фразу</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Найти фразу"
          className="min-w-0 flex-1 bg-transparent text-base outline-none"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="Очистить поиск" className="p-2">
            <X size={18} />
          </button>
        )}
      </label>

      <PhraseFilters
        theme={theme}
        topicIds={topicIds}
        lessonIds={lessonIds}
        onTopicIdsChange={onTopicIdsChange}
        onLessonIdsChange={onLessonIdsChange}
        resultCount={visiblePhrases.length}
      />

      {visiblePhrases.length === 0 ? (
        <div className="py-16 text-center">
          <h2 className="text-lg font-bold">Фразы не найдены</h2>
          <p className="mt-2 text-sm text-slate-500">Измените поиск или выбранные фильтры.</p>
        </div>
      ) : (
        <div className={'divide-y ' + (theme === 'dark' ? 'divide-slate-700' : 'divide-slate-200')}>
          {visiblePhrases.map((phrase) => (
            <article key={phrase.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-5">
              <div className="min-w-0">
                <p className="font-semibold leading-6">{phrase.russian}</p>
                <p className={'mt-1 text-sm ' + (theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>
                  [{phrase.transcription}]
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {phrase.topicIds.map((id) => (
                    <span key={id} className="rounded bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700">
                      {TOPIC_BY_ID[id]?.label}
                    </span>
                  ))}
                  {phrase.lessonIds.map((id) => (
                    <span key={id} className="rounded bg-slate-100 px-2 py-1 text-[11px] text-slate-600">
                      {LESSON_BY_ID[id]?.label}
                    </span>
                  ))}
                </div>
              </div>
              <p
                dir="rtl"
                lang="ar"
                className="arabic-readable max-w-[11rem] text-right font-semibold text-slate-900"
              >
                {phrase.arabic}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
