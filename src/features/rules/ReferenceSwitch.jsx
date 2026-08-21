import { BookOpenText, Languages, Repeat2 } from 'lucide-react';

export default function ReferenceSwitch({ activeView, onChange, theme }) {
  const items = [
    { id: 'dictionary', label: 'Словарь', icon: Languages },
    { id: 'rules', label: 'Правила', icon: BookOpenText },
    { id: 'verbs', label: 'Глаголы', icon: Repeat2 }
  ];

  return (
    <div
      className={`grid min-h-11 grid-cols-3 gap-1 rounded-xl p-1 ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
      }`}
      aria-label="Разделы справочника"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            aria-pressed={isActive}
            className={`flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? theme === 'dark'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-white text-indigo-700 shadow-sm'
                : theme === 'dark'
                  ? 'text-slate-400'
                  : 'text-slate-600'
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
