import { useCallback, useEffect, useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import { VERB_CONJUGATIONS, VERB_TENSES } from '../../data/verbConjugations.js';
import { shuffleItems } from '../../domain/phraseSelectors.js';

const makeQuestion = () => {
  const verb = shuffleItems(VERB_CONJUGATIONS)[0];
  const tense = shuffleItems(VERB_TENSES.filter((item) => verb.forms[item.id]))[0];
  const correctForm = verb.forms[tense.id];
  const alternatives = shuffleItems(
    VERB_CONJUGATIONS
      .filter((item) => item.id !== verb.id && item.forms[tense.id])
      .map((item) => item.forms[tense.id])
  ).slice(0, 3);

  return {
    verb,
    tense,
    correctForm,
    options: shuffleItems([correctForm, ...alternatives])
  };
};

export default function VerbFormsPractice({ theme }) {
  const [question, setQuestion] = useState(null);
  const [selectedArabic, setSelectedArabic] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const nextQuestion = useCallback(() => {
    setQuestion(makeQuestion());
    setSelectedArabic(null);
  }, []);

  const restart = () => {
    setCorrectCount(0);
    setAnsweredCount(0);
    nextQuestion();
  };

  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);

  if (!question) return null;

  const choose = (form) => {
    if (selectedArabic) return;
    setSelectedArabic(form.arabic);
    setAnsweredCount((count) => count + 1);
    if (form.arabic === question.correctForm.arabic) {
      setCorrectCount((count) => count + 1);
    }
  };

  return (
    <section className="content-standard mx-auto w-full">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>Правильно: {correctCount} из {answeredCount}</span>
        <button type="button" onClick={restart} className="flex min-h-10 items-center gap-2 px-2 font-semibold">
          <RotateCcw size={17} /> Сначала
        </button>
      </div>

      <article className={'rounded-lg border px-5 py-7 text-center ' + (
        theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
      )}>
        <p className="text-xs font-bold uppercase text-slate-500">Выберите нужную форму</p>
        <h1 className="mt-3 text-2xl font-bold">{question.verb.russian}</h1>
        <p className="mt-3 font-semibold text-indigo-600">{question.tense.label}</p>
        <p dir="rtl" lang="ar" className="mt-1 text-xl text-slate-500">{question.tense.arabicLabel}</p>
        <p className="mt-2 text-sm text-slate-500">Перевод формы: {question.correctForm.russian}</p>
      </article>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {question.options.map((form) => {
          const isCorrect = form.arabic === question.correctForm.arabic;
          const isSelected = selectedArabic === form.arabic;
          let stateClass = theme === 'dark'
            ? 'border-slate-700 bg-slate-800'
            : 'border-slate-200 bg-white';
          if (selectedArabic && isCorrect) stateClass = 'border-emerald-500 bg-emerald-50 text-emerald-800';
          if (isSelected && !isCorrect) stateClass = 'border-rose-500 bg-rose-50 text-rose-800';

          return (
            <button
              key={form.arabic}
              type="button"
              onClick={() => choose(form)}
              disabled={Boolean(selectedArabic)}
              className={'flex min-h-20 items-center justify-between gap-3 rounded-lg border-2 px-4 ' + stateClass}
            >
              <span className="min-w-0 text-left">
                <span dir="rtl" lang="ar" className="arabic-readable block text-slate-900">{form.arabic}</span>
                <span className="mt-1 block text-xs text-slate-500">[{form.transcription}]</span>
              </span>
              {selectedArabic && isCorrect && <Check size={20} />}
              {isSelected && !isCorrect && <X size={20} />}
            </button>
          );
        })}
      </div>

      {selectedArabic && (
        <button
          type="button"
          onClick={nextQuestion}
          className="mt-4 min-h-12 w-full rounded-lg bg-indigo-600 px-4 font-semibold text-white"
        >
          Следующий глагол
        </button>
      )}
    </section>
  );
}
