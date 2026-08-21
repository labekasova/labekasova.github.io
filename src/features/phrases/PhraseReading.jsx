import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

export default function PhraseReading({ phrases, theme }) {
  const [index, setIndex] = useState(0);
  const [showTranscription, setShowTranscription] = useState(false);

  useEffect(() => {
    setIndex(0);
    setShowTranscription(false);
  }, [phrases]);

  if (phrases.length === 0) {
    return <p className="py-16 text-center text-slate-500">Для выбранных фильтров пока нет фраз.</p>;
  }

  const phrase = phrases[index % phrases.length];
  const move = (direction) => {
    setIndex((current) => (current + direction + phrases.length) % phrases.length);
    setShowTranscription(false);
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>Фраза {index + 1} из {phrases.length}</span>
        <span>Перевод всегда открыт</span>
      </div>

      <article className={'flex min-h-[19rem] flex-col items-center justify-center rounded-lg border px-5 py-8 text-center sm:min-h-[22rem] sm:px-10 ' + (
        theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
      )}>
        <p dir="rtl" lang="ar" className="arabic-study text-slate-900">
          {phrase.arabic}
        </p>
        <p className="mt-7 text-lg font-semibold leading-7 sm:text-xl">{phrase.russian}</p>
        {showTranscription && (
          <p className={'mt-3 text-base ' + (theme === 'dark' ? 'text-slate-300' : 'text-slate-500')}>
            [{phrase.transcription}]
          </p>
        )}
        <button
          type="button"
          onClick={() => setShowTranscription((value) => !value)}
          className={'mt-6 flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm font-semibold ' + (
            theme === 'dark' ? 'border-slate-600 text-slate-200' : 'border-slate-200 text-slate-600'
          )}
        >
          {showTranscription ? <EyeOff size={18} /> : <Eye size={18} />}
          {showTranscription ? 'Скрыть транскрипцию' : 'Показать транскрипцию'}
        </button>
      </article>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          className={'flex min-h-12 items-center justify-center gap-2 rounded-lg border font-semibold ' + (
            theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
          )}
        >
          <ChevronLeft size={20} /> Назад
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-indigo-600 font-semibold text-white"
        >
          Далее <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
