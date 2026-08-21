const defineVerb = ({
  id,
  russian,
  root,
  lemmaWordId = null,
  relatedWordIds = [],
  past,
  present,
  future,
  imperative
}) => ({
  id,
  russian,
  root,
  lemmaWordId,
  relatedWordIds,
  status: 'verified',
  sourceNote: 'Первая партия глаголов',
  forms: { past, present, future, imperative }
});

export const VERB_TENSES = [
  { id: 'past', label: 'Прошедшее', arabicLabel: 'فِعْلُ الْمَاضِي' },
  { id: 'present', label: 'Настоящее', arabicLabel: 'فِعْلُ الْمُضَارِع' },
  { id: 'future', label: 'Будущее', arabicLabel: 'الْمُسْتَقْبَل' },
  { id: 'imperative', label: 'Повелительное', arabicLabel: 'فِعْلُ الْأَمْر' }
];

export const VERB_CONJUGATIONS = [
  defineVerb({
    id: 'enter',
    russian: 'входить',
    root: 'د خ ل',
    lemmaWordId: 101,
    past: { arabic: 'دَخَلَ', transcription: 'dakhala', russian: 'вошёл' },
    present: { arabic: 'يَدْخُلُ', transcription: 'yadkhulu', russian: 'входит' },
    future: { arabic: 'سَيَدْخُلُ', transcription: 'sayadkhulu', russian: 'войдёт' },
    imperative: { arabic: 'اُدْخُلْ', transcription: 'udkhul', russian: 'войди' }
  }),
  defineVerb({
    id: 'exit',
    russian: 'выходить',
    root: 'خ ر ج',
    lemmaWordId: 102,
    past: { arabic: 'خَرَجَ', transcription: 'kharaja', russian: 'вышел' },
    present: { arabic: 'يَخْرُجُ', transcription: 'yakhruju', russian: 'выходит' },
    future: { arabic: 'سَيَخْرُجُ', transcription: 'sayakhruju', russian: 'выйдет' },
    imperative: { arabic: 'اُخْرُجْ', transcription: 'ukhruj', russian: 'выйди' }
  }),
  defineVerb({
    id: 'sit',
    russian: 'сидеть',
    root: 'ج ل س',
    lemmaWordId: 2,
    past: { arabic: 'جَلَسَ', transcription: 'jalasa', russian: 'сидел' },
    present: { arabic: 'يَجْلِسُ', transcription: 'yajlisu', russian: 'сидит' },
    future: { arabic: 'سَيَجْلِسُ', transcription: 'sayajlisu', russian: 'будет сидеть' },
    imperative: { arabic: 'اِجْلِسْ', transcription: 'ijlis', russian: 'сиди' }
  }),
  defineVerb({
    id: 'stand-up',
    russian: 'вставать',
    root: 'ق و م',
    past: { arabic: 'قَامَ', transcription: 'qaama', russian: 'встал' },
    present: { arabic: 'يَقُومُ', transcription: 'yaquumu', russian: 'встаёт' },
    future: { arabic: 'سَيَقُومُ', transcription: 'sayaquumu', russian: 'встанет' },
    imperative: { arabic: 'قُمْ', transcription: 'qum', russian: 'встань' }
  }),
  defineVerb({
    id: 'say',
    russian: 'говорить',
    root: 'ق و ل',
    relatedWordIds: [401],
    past: { arabic: 'قَالَ', transcription: 'qaala', russian: 'сказал' },
    present: { arabic: 'يَقُولُ', transcription: 'yaquulu', russian: 'говорит' },
    future: { arabic: 'سَيَقُولُ', transcription: 'sayaquulu', russian: 'скажет' },
    imperative: { arabic: 'قُلْ', transcription: 'qul', russian: 'скажи' }
  }),
  defineVerb({
    id: 'take',
    russian: 'брать',
    root: 'أ خ ذ',
    lemmaWordId: 20,
    past: { arabic: 'أَخَذَ', transcription: '2akhadha', russian: 'взял' },
    present: { arabic: 'يَأْخُذُ', transcription: 'ya2khudhu', russian: 'берёт' },
    future: { arabic: 'سَيَأْخُذُ', transcription: 'saya2khudhu', russian: 'возьмёт' },
    imperative: { arabic: 'خُذْ', transcription: 'khudh', russian: 'возьми' }
  }),
  defineVerb({
    id: 'eat',
    russian: 'есть',
    root: 'أ ك ل',
    lemmaWordId: 108,
    past: { arabic: 'أَكَلَ', transcription: '2akala', russian: 'кушал' },
    present: { arabic: 'يَأْكُلُ', transcription: 'ya2kulu', russian: 'ест' },
    future: { arabic: 'سَيَأْكُلُ', transcription: 'saya2kulu', russian: 'будет есть' },
    imperative: { arabic: 'كُلْ', transcription: 'kul', russian: 'ешь' }
  }),
  defineVerb({
    id: 'drink',
    russian: 'пить',
    root: 'ش ر ب',
    lemmaWordId: 25,
    past: { arabic: 'شَرِبَ', transcription: 'shariba', russian: 'пил' },
    present: { arabic: 'يَشْرَبُ', transcription: 'yashrabu', russian: 'пьёт' },
    future: { arabic: 'سَيَشْرَبُ', transcription: 'sayashrabu', russian: 'будет пить' },
    imperative: { arabic: 'اِشْرَبْ', transcription: 'ishrab', russian: 'пей' }
  }),
  defineVerb({
    id: 'go',
    russian: 'идти',
    root: 'ذ ه ب',
    past: { arabic: 'ذَهَبَ', transcription: 'dhahaba', russian: 'пошёл' },
    present: { arabic: 'يَذْهَبُ', transcription: 'yadhhabu', russian: 'идёт' },
    future: { arabic: 'سَيَذْهَبُ', transcription: 'sayadhhabu', russian: 'пойдёт' },
    imperative: { arabic: 'اِذْهَبْ', transcription: 'idhhab', russian: 'иди' }
  })
];

export const VERB_CONJUGATION_BY_ID = Object.fromEntries(
  VERB_CONJUGATIONS.map((verb) => [verb.id, verb])
);
