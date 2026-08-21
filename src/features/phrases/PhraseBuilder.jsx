import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { shuffleItems } from '../../domain/phraseSelectors.js';

const prepareTokens = (phrase) => shuffleItems(
  phrase.buildTokens.map((value, index) => ({ id: index, value }))
);

export default function PhraseBuilder({ phrases, theme }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState([]);

  const phrase = phrases[phraseIndex % Math.max(phrases.length, 1)] ?? null;
  const resetTokens = useCallback(() => {
    if (!phrase) {
      setAvailable([]);
      setSelected([]);
      return;
    }
    setAvailable(prepareTokens(phrase));
    setSelected([]);
  }, [phrase]);

  useEffect(() => {
    setPhraseIndex(0);
  }, [phrases]);

  useEffect(() => {
    resetTokens();
  }, [resetTokens]);

  const completed = Boolean(phrase) && selected.length === phrase.buildTokens.length;
  const isCorrect = useMemo(() => (
    completed && selected.every((token, index) => token.id === index)
  ), [completed, selected]);

  if (!phrase) {
    return <p className="py-16 text-center text-slate-500">Для выбранных фильтров пока нет фраз.</p>;
  }

  const selectToken = (token) => {
    if (completed) return;
    setAvailable((items) => items.filter((item) => item.id !== token.id));
    setSelected((items) => [...items, token]);
  };

  const returnToken = (token) => {
    if (completed) return;
    setSelected((items) => items.filter((item) => item.id !== token.id));
    setAvailable((items) => [...items, token]);
  };

  const nextPhrase = () => {
    setPhraseIndex((index) => (index + 1) % phrases.length);
  };

  const tokenClass = theme === 'dark'
    ? 'border-slate-600 bg-slate-700 text-slate-100'
    : 'border-slate-200 bg-white text-slate-800';

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>Фраза {phraseIndex + 1} из {phrases.length}</span>
        <button type="button" onClick={resetTokens} className="flex min-h-10 items-center gap-2 px-2 font-semibold">
          <RotateCcw size={17} /> Сбросить
        </button>
      </div>

      <article className={'rounded-lg border px-5 py-6 text-center ' + (
        theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
      )}>
        <p className="text-xs font-bold uppercase text-slate-500">Соберите фразу</p>
        <p className="mt-3 text-lg font-semibold leading-7">{phrase.russian}</p>
      </article>

      <div
        dir="rtl"
        className={'mt-4 flex min-h-28 flex-wrap content-center justify-center gap-2 rounded-lg border-2 border-dashed p-3 ' + (
          theme === 'dark' ? 'border-slate-600 bg-slate-800/50' : 'border-slate-200 bg-slate-50'
        )}
        aria-label="Собранная фраза"
      >
        {selected.length === 0 && (
          <span dir="ltr" className="self-center text-sm text-slate-400">Нажимайте слова в правильном порядке</span>
        )}
        {selected.map((token) => (
          <button
            key={token.id}
            type="button"
            onClick={() => returnToken(token)}
            className={'arabic-token min-h-12 rounded-lg border px-3 ' + tokenClass}
          >
            {token.value}
          </button>
        ))}
      </div>

      <div dir="rtl" className="mt-4 flex min-h-24 flex-wrap content-start justify-center gap-2">
        {available.map((token) => (
          <button
            key={token.id}
            type="button"
            onClick={() => selectToken(token)}
            className={'arabic-token min-h-12 rounded-lg border px-3 shadow-sm ' + tokenClass}
          >
            {token.value}
          </button>
        ))}
      </div>

      {completed && (
        <div className={'mt-4 rounded-lg border p-4 text-center ' + (
          isCorrect
            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
            : 'border-amber-300 bg-amber-50 text-amber-900'
        )}>
          <p className="flex items-center justify-center gap-2 font-bold">
            {isCorrect && <Check size={20} />}
            {isCorrect ? 'Фраза собрана правильно' : 'Порядок пока неверный'}
          </p>
          {isCorrect ? (
            <>
              <p className="mt-2 text-sm">[{phrase.transcription}]</p>
              <button
                type="button"
                onClick={nextPhrase}
                className="mt-4 min-h-12 w-full rounded-lg bg-indigo-600 px-4 font-semibold text-white"
              >
                Следующая фраза
              </button>
            </>
          ) : (
            <button type="button" onClick={resetTokens} className="mt-3 min-h-11 rounded-lg bg-amber-200 px-4 font-semibold">
              Попробовать ещё раз
            </button>
          )}
        </div>
      )}
    </section>
  );
}
