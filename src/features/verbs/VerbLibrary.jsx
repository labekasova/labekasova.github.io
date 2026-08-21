import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import {
  VERB_CONJUGATION_BY_ID,
  VERB_CONJUGATIONS,
  VERB_TENSES
} from '../../data/verbConjugations.js';
import { normalizePhraseSearch } from '../../domain/phraseSelectors.js';

function VerbArticle({ verb, theme, onBack }) {
  return (
    <article className="mx-auto w-full max-w-3xl">
      <button type="button" onClick={onBack} className="mb-4 flex min-h-11 items-center gap-2 font-semibold text-indigo-600">
        <ArrowLeft size={20} /> Все глаголы
      </button>
      <header className="mb-6">
        <p className="text-sm font-semibold text-indigo-600">Корень: {verb.root}</p>
        <h1 className="mt-1 text-2xl font-bold">{verb.russian}</h1>
      </header>

      <div className={'divide-y border-y ' + (
        theme === 'dark' ? 'divide-slate-700 border-slate-700' : 'divide-slate-200 border-slate-200'
      )}>
        {VERB_TENSES.map((tense) => {
          const form = verb.forms[tense.id];
          if (!form) return null;
          return (
            <section key={tense.id} className="grid gap-3 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-center">
              <div>
                <h2 className="font-bold">{tense.label}</h2>
                <p dir="rtl" lang="ar" className="mt-1 text-lg text-slate-500">{tense.arabicLabel}</p>
              </div>
              <div className="sm:text-right">
                <p dir="rtl" lang="ar" className="arabic-dialogue text-slate-900">{form.arabic}</p>
                <p className="mt-1 font-semibold">{form.russian}</p>
                <p className="mt-1 text-sm text-slate-500">[{form.transcription}]</p>
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
}

export default function VerbLibrary({ theme, selectedVerbId, onOpen, onBack }) {
  const [query, setQuery] = useState('');
  const selectedVerb = selectedVerbId ? VERB_CONJUGATION_BY_ID[selectedVerbId] : null;
  const verbs = useMemo(() => {
    const normalizedQuery = normalizePhraseSearch(query);
    if (!normalizedQuery) return VERB_CONJUGATIONS;

    return VERB_CONJUGATIONS.filter((verb) => normalizePhraseSearch([
      verb.russian,
      verb.root,
      ...Object.values(verb.forms).flatMap((form) => [form.arabic, form.transcription, form.russian])
    ].join(' ')).includes(normalizedQuery));
  }, [query]);

  if (selectedVerb) {
    return <VerbArticle verb={selectedVerb} theme={theme} onBack={onBack} />;
  }

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Формы глаголов</h1>
        <p className="mt-1 text-sm text-slate-500">Прошедшее, настоящее, будущее и повелительное</p>
      </div>
      <label className={'flex min-h-12 items-center gap-3 rounded-lg border px-3 ' + (
        theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'
      )}>
        <Search size={20} className="text-slate-400" />
        <span className="sr-only">Найти глагол</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Глагол, перевод или корень"
          className="min-w-0 flex-1 bg-transparent text-base outline-none"
        />
      </label>
      <p className="text-sm text-slate-500">Найдено: {verbs.length}</p>

      <div className={'divide-y ' + (theme === 'dark' ? 'divide-slate-700' : 'divide-slate-200')}>
        {verbs.map((verb) => (
          <button
            key={verb.id}
            type="button"
            onClick={() => onOpen(verb.id)}
            className="grid min-h-24 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 py-4 text-left"
          >
            <span className="min-w-0">
              <span className="block text-lg font-bold">{verb.russian}</span>
              <span className="mt-1 block text-sm text-slate-500">Корень: {verb.root}</span>
            </span>
            <span dir="rtl" lang="ar" className="arabic-readable text-slate-900">
              {verb.forms.past?.arabic}
            </span>
            <ChevronRight size={22} className="text-slate-400" />
          </button>
        ))}
      </div>
    </section>
  );
}
