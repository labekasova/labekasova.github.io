import { useMemo, useState } from 'react';
import { BookOpen, Blocks, CheckCircle2, Library, MessagesSquare } from 'lucide-react';
import { PHRASES_DATA } from '../../data/phrases.js';
import { filterPhrases } from '../../domain/phraseSelectors.js';
import DialoguesLibrary from './DialoguesLibrary.jsx';
import PhraseBuilder from './PhraseBuilder.jsx';
import PhraseFilters from './PhraseFilters.jsx';
import PhraseLibrary from './PhraseLibrary.jsx';
import PhraseReading from './PhraseReading.jsx';
import PhraseTranslationQuiz from './PhraseTranslationQuiz.jsx';

const phraseModes = [
  { id: 'library', label: 'Каталог', icon: Library },
  { id: 'read', label: 'Читать', icon: BookOpen },
  { id: 'translation', label: 'Перевод', icon: CheckCircle2 },
  { id: 'build', label: 'Собрать', icon: Blocks }
];

export default function PhrasesHub({ theme, pathname, navigate }) {
  const [topicIds, setTopicIds] = useState([]);
  const [lessonIds, setLessonIds] = useState([]);
  const dialogueMatch = pathname.match(/^\/phrases\/dialogues(?:\/([^/]+))?/);
  const isDialogues = Boolean(dialogueMatch);
  const selectedDialogueId = dialogueMatch?.[1] ?? null;
  const activeMode = phraseModes.find((mode) => pathname === '/phrases/' + mode.id)?.id || 'library';
  const filteredPhrases = useMemo(() => filterPhrases(PHRASES_DATA, {
    topicIds,
    lessonIds
  }), [topicIds, lessonIds]);

  return (
    <div className="content-wide w-full space-y-5">
      <div
        className={'grid min-h-11 grid-cols-2 gap-1 rounded-lg p-1 ' + (
          theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
        )}
        aria-label="Тип материалов"
      >
        <button
          type="button"
          onClick={() => navigate('/phrases/library')}
          className={'flex items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold ' + (
            !isDialogues
              ? theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-500'
          )}
        >
          <BookOpen size={18} /> Фразы
        </button>
        <button
          type="button"
          onClick={() => navigate('/phrases/dialogues')}
          className={'flex items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold ' + (
            isDialogues
              ? theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-500'
          )}
        >
          <MessagesSquare size={18} /> Диалоги
        </button>
      </div>

      {!isDialogues && (
        <nav className={'grid grid-cols-4 gap-1 rounded-lg p-1 ' + (
          theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
        )} aria-label="Режим работы с фразами">
          {phraseModes.map((mode) => {
            const Icon = mode.icon;
            const selected = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => navigate('/phrases/' + mode.id)}
                aria-pressed={selected}
                className={'flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-md px-1 text-[11px] font-semibold sm:min-h-11 sm:flex-row sm:text-sm ' + (
                  selected
                    ? theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-500'
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span className="max-w-full truncate">{mode.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {!isDialogues && activeMode !== 'library' && (
        <PhraseFilters
          theme={theme}
          topicIds={topicIds}
          lessonIds={lessonIds}
          onTopicIdsChange={setTopicIds}
          onLessonIdsChange={setLessonIds}
          resultCount={filteredPhrases.length}
        />
      )}

      {!isDialogues && activeMode === 'library' && (
        <PhraseLibrary
          phrases={filteredPhrases}
          theme={theme}
          topicIds={topicIds}
          lessonIds={lessonIds}
          onTopicIdsChange={setTopicIds}
          onLessonIdsChange={setLessonIds}
        />
      )}
      {!isDialogues && activeMode === 'read' && <PhraseReading phrases={filteredPhrases} theme={theme} />}
      {!isDialogues && activeMode === 'translation' && <PhraseTranslationQuiz phrases={filteredPhrases} theme={theme} />}
      {!isDialogues && activeMode === 'build' && <PhraseBuilder phrases={filteredPhrases} theme={theme} />}

      {isDialogues && (
        <DialoguesLibrary
          theme={theme}
          selectedDialogueId={selectedDialogueId}
          onOpen={(id) => navigate('/phrases/dialogues/' + id)}
          onBack={() => navigate('/phrases/dialogues')}
          topicIds={topicIds}
          lessonIds={lessonIds}
          onTopicIdsChange={setTopicIds}
          onLessonIdsChange={setLessonIds}
        />
      )}
    </div>
  );
}
