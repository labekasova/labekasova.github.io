import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { DIALOGUE_BY_ID, DIALOGUES_DATA } from '../../data/dialogues.js';
import { normalizePhraseSearch } from '../../domain/phraseSelectors.js';
import PhraseFilters from './PhraseFilters.jsx';

const filterDialogues = (dialogues, query, topicIds, lessonIds) => {
  const normalizedQuery = normalizePhraseSearch(query);

  return dialogues.filter((dialogue) => {
    const matchesTopic = topicIds.length === 0 || topicIds.some((id) => dialogue.topicIds.includes(id));
    const matchesLesson = lessonIds.length === 0 || lessonIds.some((id) => dialogue.lessonIds.includes(id));
    const text = normalizePhraseSearch([
      dialogue.title,
      dialogue.summary,
      ...dialogue.lines.flatMap((line) => [line.arabic, line.transcription, line.russian])
    ].join(' '));

    return matchesTopic && matchesLesson && (!normalizedQuery || text.includes(normalizedQuery));
  });
};

function DialogueArticle({ dialogue, theme, onBack }) {
  const participantById = Object.fromEntries(
    dialogue.participants.map((participant) => [participant.id, participant])
  );

  return (
    <article className="mx-auto w-full max-w-3xl">
      <button type="button" onClick={onBack} className="mb-4 flex min-h-11 items-center gap-2 font-semibold text-indigo-600">
        <ArrowLeft size={20} /> Все диалоги
      </button>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{dialogue.title}</h1>
        <p className="mt-2 leading-6 text-slate-500">{dialogue.summary}</p>
      </header>

      <div className={'divide-y border-y ' + (
        theme === 'dark' ? 'divide-slate-700 border-slate-700' : 'divide-slate-200 border-slate-200'
      )}>
        {dialogue.lines.map((line, index) => (
          <section key={line.id} className="py-5 sm:grid sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-5">
            <p className="mb-2 text-xs font-bold uppercase text-indigo-600 sm:mb-0 sm:pt-2">
              {participantById[line.speakerId]?.label || 'Собеседник'}
            </p>
            <div className="min-w-0">
              <p dir="rtl" lang="ar" className="arabic-dialogue text-right text-slate-900">
                {line.arabic}
              </p>
              <p className="mt-2 text-base font-semibold leading-6">{line.russian}</p>
              <p className="mt-1 text-sm text-slate-500">[{line.transcription}]</p>
              <span className="sr-only">Реплика {index + 1}</span>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export default function DialoguesLibrary({
  theme,
  selectedDialogueId,
  onOpen,
  onBack,
  topicIds,
  lessonIds,
  onTopicIdsChange,
  onLessonIdsChange
}) {
  const [query, setQuery] = useState('');
  const dialogues = useMemo(
    () => filterDialogues(DIALOGUES_DATA, query, topicIds, lessonIds),
    [query, topicIds, lessonIds]
  );
  const selectedDialogue = selectedDialogueId ? DIALOGUE_BY_ID[selectedDialogueId] : null;

  if (selectedDialogue) {
    return <DialogueArticle dialogue={selectedDialogue} theme={theme} onBack={onBack} />;
  }

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Диалоги</h1>
        <p className="mt-1 text-sm text-slate-500">Материалы для чтения с переводом, без упражнений</p>
      </div>
      <label className={'flex min-h-12 items-center gap-3 rounded-lg border px-3 ' + (
        theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'
      )}>
        <Search size={20} className="text-slate-400" />
        <span className="sr-only">Найти диалог</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Название или текст диалога"
          className="min-w-0 flex-1 bg-transparent text-base outline-none"
        />
      </label>
      <PhraseFilters
        theme={theme}
        topicIds={topicIds}
        lessonIds={lessonIds}
        onTopicIdsChange={onTopicIdsChange}
        onLessonIdsChange={onLessonIdsChange}
        resultCount={dialogues.length}
      />

      <div className={'divide-y ' + (theme === 'dark' ? 'divide-slate-700' : 'divide-slate-200')}>
        {dialogues.map((dialogue) => (
          <button
            key={dialogue.id}
            type="button"
            onClick={() => onOpen(dialogue.id)}
            className="flex min-h-24 w-full items-center justify-between gap-4 py-4 text-left"
          >
            <span className="min-w-0">
              <span className="block text-lg font-bold">{dialogue.title}</span>
              <span className="mt-1 block text-sm leading-5 text-slate-500">{dialogue.summary}</span>
              <span className="mt-2 block text-xs font-semibold text-indigo-600">
                {dialogue.lines.length} реплик
              </span>
            </span>
            <ChevronRight size={22} className="shrink-0 text-slate-400" />
          </button>
        ))}
      </div>
    </section>
  );
}
