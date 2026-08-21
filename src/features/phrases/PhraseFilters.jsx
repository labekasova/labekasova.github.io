import { SlidersHorizontal } from 'lucide-react';
import { LESSONS } from '../../data/lessons.js';
import { TOPICS } from '../../data/topics.js';

const toggleValue = (values, value) => (
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value]
);

function FilterGroup({ title, items, values, onChange, theme }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-bold uppercase text-slate-500">{title}</legend>
      <div className="grid gap-1 sm:grid-cols-2">
        {items.map((item) => {
          const selected = values.includes(item.id);
          const color = selected
            ? theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-indigo-50 text-indigo-700'
            : theme === 'dark' ? 'text-slate-200' : 'text-slate-700';

          return (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={selected}
              onClick={() => onChange(toggleValue(values, item.id))}
              className={'flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-sm leading-5 ' + color}
            >
              <span className={'h-5 w-5 shrink-0 rounded border-2 ' + (
                selected
                  ? 'border-indigo-500 bg-indigo-500'
                  : theme === 'dark' ? 'border-slate-500' : 'border-slate-300'
              )} />
              {item.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function PhraseFilters({
  theme,
  topicIds,
  lessonIds,
  onTopicIdsChange,
  onLessonIdsChange,
  resultCount
}) {
  const activeCount = topicIds.length + lessonIds.length;

  return (
    <details className={'rounded-lg border ' + (
      theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
    )}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal size={18} aria-hidden="true" />
          Фильтры
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs text-white">
              {activeCount}
            </span>
          )}
        </span>
        <span className={'text-sm ' + (theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>
          Найдено: {resultCount}
        </span>
      </summary>
      <div className={'space-y-5 border-t p-3 sm:p-4 ' + (
        theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
      )}>
        <FilterGroup
          title="Тема общения"
          items={TOPICS}
          values={topicIds}
          onChange={onTopicIdsChange}
          theme={theme}
        />
        <FilterGroup
          title="Урок"
          items={LESSONS}
          values={lessonIds}
          onChange={onLessonIdsChange}
          theme={theme}
        />
        <button
          type="button"
          onClick={() => {
            onTopicIdsChange([]);
            onLessonIdsChange([]);
          }}
          disabled={activeCount === 0}
          className={'min-h-11 rounded-lg px-4 text-sm font-semibold disabled:opacity-40 ' + (
            theme === 'dark' ? 'bg-slate-700 text-slate-100' : 'bg-slate-100 text-slate-700'
          )}
        >
          Сбросить фильтры
        </button>
      </div>
    </details>
  );
}
