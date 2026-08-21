import { useCallback, useEffect, useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import { getTranslationOptions, shuffleItems } from '../../domain/phraseSelectors.js';

export default function PhraseTranslationQuiz({ phrases, theme }) {
  const [pool, setPool] = useState([]);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const start = useCallback(() => {
    const nextPool = shuffleItems(phrases);
    const nextQuestion = nextPool[0] ?? null;
    setPool(nextPool.slice(1));
    setQuestion(nextQuestion);
    setOptions(nextQuestion ? getTranslationOptions(nextQuestion, phrases) : []);
    setSelected(null);
    setCorrectCount(0);
    setAnsweredCount(0);
  }, [phrases]);

  useEffect(() => {
    start();
  }, [start]);

  const choose = (option) => {
    if (selected || !question) return;
    setSelected(option);
    setAnsweredCount((count) => count + 1);
    if (option === question.russian) setCorrectCount((count) => count + 1);
  };

  const next = () => {
    let nextPool = pool;
    if (nextPool.length === 0) nextPool = shuffleItems(phrases);
    const nextQuestion = nextPool[0] ?? null;
    setPool(nextPool.slice(1));
    setQuestion(nextQuestion);
    setOptions(nextQuestion ? getTranslationOptions(nextQuestion, phrases) : []);
    setSelected(null);
  };

  if (!question) {
    return <p className="py-16 text-center text-slate-500">Для выбранных фильтров пока нет фраз.</p>;
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>Правильно: {correctCount} из {answeredCount}</span>
        <button type="button" onClick={start} className="flex min-h-10 items-center gap-2 px-2 font-semibold">
          <RotateCcw size={17} /> Сначала
        </button>
      </div>

      <article className={'rounded-lg border px-5 py-8 text-center sm:px-10 ' + (
        theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
      )}>
        <p className="text-xs font-bold uppercase text-slate-500">Выберите перевод</p>
        <p dir="rtl" lang="ar" className="arabic-study mt-5 text-slate-900">
          {question.arabic}
        </p>
      </article>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isCorrect = option === question.russian;
          const isSelected = selected === option;
          let stateClass = theme === 'dark'
            ? 'border-slate-700 bg-slate-800'
            : 'border-slate-200 bg-white';

          if (selected && isCorrect) stateClass = 'border-emerald-500 bg-emerald-50 text-emerald-800';
          if (isSelected && !isCorrect) stateClass = 'border-rose-500 bg-rose-50 text-rose-800';

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              disabled={Boolean(selected)}
              className={'flex min-h-16 items-center justify-between gap-3 rounded-lg border-2 px-4 text-left font-semibold leading-6 ' + stateClass}
            >
              <span>{option}</span>
              {selected && isCorrect && <Check size={20} className="shrink-0" />}
              {isSelected && !isCorrect && <X size={20} className="shrink-0" />}
            </button>
          );
        })}
      </div>

      {selected && (
        <button
          type="button"
          onClick={next}
          className="mt-4 min-h-12 w-full rounded-lg bg-indigo-600 px-4 font-semibold text-white"
        >
          Следующая фраза
        </button>
      )}
    </section>
  );
}
