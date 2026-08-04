import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const WORD_TYPES = {
  verb: 'verb',
  noun: 'noun',
  particle: 'particle'
};

const WORD_FILTERS = [
  { id: 'all', label: 'Все слова', title: 'Все слова', type: null },
  {
    id: 'verb',
    label: 'Только глаголы ( فِعْلٌ )',
    title: 'Глаголы ( فِعْلٌ )',
    type: WORD_TYPES.verb
  },
  {
    id: 'noun',
    label: 'Только имена ( اِسْمٌ )',
    title: 'Имена ( اِسْمٌ )',
    type: WORD_TYPES.noun
  },
  {
    id: 'particle',
    label: 'Только частицы ( حَرْفٌ )',
    title: 'Частицы ( حَرْفٌ )',
    type: WORD_TYPES.particle
  }
];

const LESSON_GROUPS = {
  group1: 'Глаголы с 1го модуля',
  group2: 'Слова с урока про Сукун',
  group3: 'Слова с урока про Шадда'
};
const LESSON_FILTERS = [
  { id: 'all', label: 'Все уроки' },
  ...Object.values(LESSON_GROUPS)
    .reverse()
    .map((group) => ({ id: group, label: group }))
];

const getLessonGroup = (wordId) => {
  if (wordId >= 201 && wordId <= 206) {
    return LESSON_GROUPS.group2;
  }

  if (wordId >= 207 && wordId <= 212) {
    return LESSON_GROUPS.group3;
  }

  return LESSON_GROUPS.group1;
};
// Полная логическая база слов
const WORDS_BASE = [
  // --- ГРУППА 1: Глаголы с 1го модуля 07/2026 ---
  { id: 101, arabic: "دَخَلَ", transcription: "dakhala", russian: "вошёл", group: "Помещение и движение", type: WORD_TYPES.verb },
  { id: 102, arabic: "خَرَجَ", transcription: "kharaja", russian: "вышел", group: "Помещение и движение", type: WORD_TYPES.verb },
  { id: 19,  arabic: "وَقَفَ", transcription: "waqafa", russian: "стоял", group: "Помещение и движение", type: WORD_TYPES.verb },
  { id: 2,   arabic: "جَلَسَ", transcription: "jalasa", russian: "сидел", group: "Помещение и движение", type: WORD_TYPES.verb },
  { id: 16,  arabic: "نَزَلَ", transcription: "nazala", russian: "спускался", group: "Помещение и движение", type: WORD_TYPES.verb },
  { id: 103, arabic: "سَكَنَ", transcription: "sakana", russian: "жил / проживал", group: "Помещение и движение", type: WORD_TYPES.verb },
  { id: 104, arabic: "حَجَزَ", transcription: "Hajaza", russian: "забронировал", group: "Поездка и визиты", type: WORD_TYPES.verb },
  { id: 105, arabic: "طَلَبَ", transcription: "Talaba", russian: "потребовал / попросил", group: "Поездка и визиты", type: WORD_TYPES.verb },
  { id: 106, arabic: "طَرَقَ", transcription: "Taraqa", russian: "постучался", group: "Поездка и визиты", type: WORD_TYPES.verb },
  { id: 107, arabic: "ظَهَرَ", transcription: "DHahara", russian: "появился", group: "Поездка и визиты", type: WORD_TYPES.verb },
  { id: 24,  arabic: "سَبَحَ", transcription: "sabaHa", russian: "плыл", group: "Вода и Еда", type: WORD_TYPES.verb },
  { id: 25,  arabic: "شَرِبَ", transcription: "shariba", russian: "пил", group: "Вода и Еда", type: WORD_TYPES.verb },
  { id: 108, arabic: "أَكَلَ", transcription: "2akala", russian: "покушал / ел", group: "Вода и Еда", type: WORD_TYPES.verb },
  { id: 7,   arabic: "غَسَلَ", transcription: "ghasala", russian: "стирал / мыл", group: "Вода и Еда", type: WORD_TYPES.verb },
  { id: 109, arabic: "لَبِسَ", transcription: "labisa", russian: "одел / надел", group: "Одежда и состояние", type: WORD_TYPES.verb },
  { id: 18,  arabic: "مَرِضَ", transcription: "mariDa", russian: "болел", group: "Одежда и состояние", type: WORD_TYPES.verb },
  { id: 110, arabic: "فَرِحَ", transcription: "fariHa", russian: "обрадовался", group: "Одежда и состояние", type: WORD_TYPES.verb },
  { id: 5,   arabic: "فَهِمَ", transcription: "fahima", russian: "понял", group: "Учёба и знания", type: WORD_TYPES.verb },
  { id: 21,  arabic: "حَفِظَ", transcription: "HafiDHa", russian: "запоминал", group: "Учёба и знания", type: WORD_TYPES.verb },
  { id: 111, arabic: "دَرَسَ", transcription: "darasa", russian: "учил / учился", group: "Учёба и знания", type: WORD_TYPES.verb },
  { id: 112, arabic: "عَلِمَ", transcription: "3alima", russian: "знал", group: "Учёба и знания", type: WORD_TYPES.verb },
  { id: 113, arabic: "قَرَأَ", transcription: "qara2a", russian: "читал", group: "Учёба и знания", type: WORD_TYPES.verb },
  { id: 114, arabic: "كَتَبَ", transcription: "kataba", russian: "писал", group: "Учёба и знания", type: WORD_TYPES.verb },
  { id: 20,  arabic: "أَخَذَ", transcription: "2akhadha", russian: "взял / забрал", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 115, arabic: "وَضَعَ", transcription: "waDa3a", russian: "положил", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 116, arabic: "مَسَكَ", transcription: "masaka", russian: "держал", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 17,  arabic: "حَمَلَ", transcription: "Hamala", russian: "нёс", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 15,  arabic: "دَفَعَ", transcription: "dafa3a", russian: "толкал", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 14,  arabic: "رَبَطَ", transcription: "rabaTa", russian: "завязал", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 4,   arabic: "هَدَمَ", transcription: "hadama", russian: "разрушил", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 117, arabic: "فَقَدَ", transcription: "faqada", russian: "потерял", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 8,   arabic: "وَجَدَ", transcription: "wajada", russian: "нашёл", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 11,  arabic: "عَمِلَ", transcription: "3amila", russian: "сделал / выполнил", group: "Действия руками", type: WORD_TYPES.verb },
  { id: 9,   arabic: "رَسَمَ", transcription: "rasama", russian: "рисовал", group: "Творчество и активность", type: WORD_TYPES.verb },
  { id: 13,  arabic: "نَفَخَ", transcription: "nafakha", russian: "надул", group: "Творчество и активность", type: WORD_TYPES.verb },
  { id: 10,  arabic: "ضَرَبَ", transcription: "Daraba", russian: "ударил", group: "Творчество и активность", type: WORD_TYPES.verb },
  { id: 118, arabic: "حَكَمَ", transcription: "Hakama", russian: "управлял / судил", group: "Творчество и активность", type: WORD_TYPES.verb },
  { id: 119, arabic: "نَظَرَ", transcription: "naDHara", russian: "смотрел", group: "Творчество и активность", type: WORD_TYPES.verb },
  { id: 12,  arabic: "سَكَتَ", transcription: "sakata", russian: "молчал", group: "Общение и дух", type: WORD_TYPES.verb },
  { id: 6,   arabic: "شَكَرَ", transcription: "shakara", russian: "поблагодарил", group: "Общение и дух", type: WORD_TYPES.verb },
  { id: 3,   arabic: "حَمِدَ", transcription: "Hamida", russian: "воздал хвалу [Богу]", group: "Общение и дух", type: WORD_TYPES.verb },
  { id: 1,   arabic: "سَجَدَ", transcription: "sajada", russian: "совершил земной поклон", group: "Общение и дух", type: WORD_TYPES.verb },

    // --- ГРУППА 2: Новые существительные с урока про Сукун 30/07/2026 ---
  { id: 201, arabic: "مَغْرِبُ", transcription: "maghribu", russian: "закат, вечернее время", group: "Время дня", type: WORD_TYPES.noun },
  { id: 202, arabic: "دَفْتَرُ", transcription: "daftaru", russian: "тетрадь", group: "Учёба и знания", type: WORD_TYPES.noun },
  { id: 203, arabic: "مَوْزُ", transcription: "mawzu", russian: "банан", group: "Вода и Еда", type: WORD_TYPES.noun },
  { id: 204, arabic: "وَرْدَةُ", transcription: "wardatu", russian: "цветок / роза", group: "Растения", type: WORD_TYPES.noun },
  { id: 205, arabic: "مُسْلِمُ", transcription: "muslimu", russian: "мусульманин / покорный [Богу]", group: "Люди", type: WORD_TYPES.noun },
  { id: 206, arabic: "بِنْتُ", transcription: "bintu", russian: "девочка / дочь", group: "Люди", type: WORD_TYPES.noun },

  // --- ГРУППА 3: Новые слова с урока про Шадда 04/08/2026 ---
  { id: 207, arabic: "مُحَمَّدٌ", transcription: "muHammadu", russian: "Мухаммад / Магомед", group: "Люди", type: WORD_TYPES.noun },
  { id: 208, arabic: "يَحُجُّ", transcription: "yaHujju", russian: "совершает хадж", group: "Вера и поклонение", type: WORD_TYPES.verb },
  { id: 209, arabic: "سِنٌّ", transcription: "sinnu", russian: "зуб", group: "Тело", type: WORD_TYPES.noun },
  { id: 210, arabic: "صَدَّقَ", transcription: "Saddaqa", russian: "поверил / сказал правду", group: "Общение и дух", type: WORD_TYPES.verb },
  { id: 211, arabic: "جَنَّةٌ", transcription: "jannatun", russian: "рай / сад", group: "Вера и поклонение", type: WORD_TYPES.noun },
  { id: 212, arabic: "كَذَّبَ", transcription: "kadhdhaba", russian: "отрицал / счёл ложью", group: "Общение и дух", type: WORD_TYPES.verb }
];

const AUDIO_READY_TRANSCRIPTIONS = new Set([
  ...WORDS_BASE
    .filter((word) => word.id < 200)
    .map((word) => word.transcription),
  'bintu',
  'daftaru',
  'mawzu',
  'maghribu',
  'muslimu',
  'wardatu'
]);

const WORDS_DATA = WORDS_BASE.map((word) => ({
  ...word,
  group: getLessonGroup(word.id),
  audio: AUDIO_READY_TRANSCRIPTIONS.has(word.transcription) ? `/audio/${word.transcription}.mp3` : null
}));

// Клавиатура для ввода
const ARABIC_KEYS = [
  ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
  ["ش", "س", "ي", "ب", "ل", "ا", "أ", "ت", "ن", "م", "ك", "ط", "ذ"],
  ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ"],
  ["َ", "ِ", "ُ", "ْ", "ّ"] // Огласовки
];

// SVG Иконки
const IconBook = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IconPen = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const IconArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const IconShuffle = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/></svg>;
const IconRotateCcw = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconVolume = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>;
const IconMoon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 1 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const IconSun = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const IconChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
export default function App() {
  const audioRef = useRef(null);
  const audioRequestRef = useRef(0);
  const audioSourceRef = useRef('');
  const [activeTab, setActiveTab] = useState('learn'); // 'learn', 'quiz' или 'write'
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeLessonGroup, setActiveLessonGroup] = useState('all');
  const [draftFilter, setDraftFilter] = useState('all');
  const [draftLessonGroup, setDraftLessonGroup] = useState('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });
  
  // Состояния карточек
  const initialWords = WORDS_DATA;
  const [words, setWords] = useState(initialWords);
  const [isSortedLogical, setIsSortedLogical] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [cardDirection, setCardDirection] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Состояния Теста
  const [quizPool, setQuizPool] = useState(initialWords); 
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctCountQuiz, setCorrectCountQuiz] = useState(0);

  // Состояния Письма
  const [writePool, setWritePool] = useState(initialWords); 
  const [writeQuestion, setWriteQuestion] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [writeChecked, setWriteChecked] = useState(false);
  const [isWriteCorrect, setIsWriteCorrect] = useState(null);
  const [writeCompleted, setWriteCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCountWrite, setCorrectCountWrite] = useState(0);

  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const activeFilterOption = WORD_FILTERS.find((filter) => filter.id === activeFilter) ?? WORD_FILTERS[0];
  const activeLessonOption = LESSON_FILTERS.find((lesson) => lesson.id === activeLessonGroup) ?? LESSON_FILTERS[0];
  const draftFilterOption = WORD_FILTERS.find((filter) => filter.id === draftFilter) ?? WORD_FILTERS[0];
  const filteredWords = useMemo(() => (
    WORDS_DATA.filter((word) => (
      (activeFilterOption.type ? word.type === activeFilterOption.type : true) &&
      (activeLessonGroup === 'all' ? true : word.group === activeLessonGroup)
    ))
  ), [activeFilterOption.type, activeLessonGroup]);
  const draftFilteredWords = useMemo(() => (
    WORDS_DATA.filter((word) => (
      (draftFilterOption.type ? word.type === draftFilterOption.type : true) &&
      (draftLessonGroup === 'all' ? true : word.group === draftLessonGroup)
    ))
  ), [draftFilterOption.type, draftLessonGroup]);

  const resetLearningState = useCallback((nextWords) => {
    setWords([...nextWords]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSortedLogical(true);
    setCardDirection(null);
  }, []);

  const resetQuizState = useCallback((nextWords) => {
    const freshPool = shuffleArray(nextWords);
    setQuizPool(freshPool);
    setQuizQuestion(null);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setQuizCompleted(nextWords.length === 0);
    setCorrectCountQuiz(0);
  }, []);

  const resetWriteState = useCallback((nextWords) => {
    const freshPool = shuffleArray(nextWords);
    setWritePool(freshPool);
    setWriteQuestion(null);
    setTypedAnswer("");
    setWriteChecked(false);
    setIsWriteCorrect(null);
    setWriteCompleted(nextWords.length === 0);
    setShowHint(false);
    setCorrectCountWrite(0);
  }, []);

  // Обучение
  const handleShuffle = () => {
    setWords(shuffleArray(filteredWords));
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSortedLogical(false);
  };

  const handleResetToLogical = () => {
    resetLearningState(filteredWords);
  };

  const nextCard = useCallback(() => {
    setIsFlipped(false);
    setCardDirection('next');
    setCurrentIndex((prev) => (prev + 1) % words.length);
    setTimeout(() => setCardDirection(null), 380);
  }, [words.length]);

  const prevCard = useCallback(() => {
    setIsFlipped(false);
    setCardDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    setTimeout(() => setCardDirection(null), 380);
  }, [words.length]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextCard();
    else if (distance < -50) prevCard();
  };

  // Тест
  const generateQuizQuestion = useCallback((currentPool) => {
    if (currentPool.length === 0) {
      setQuizCompleted(true);
      return;
    }
    const correctWord = currentPool[Math.floor(Math.random() * currentPool.length)];
    const wrongCandidates = filteredWords.filter(w => w.arabic !== correctWord.arabic);
    const shuffledWrong = shuffleArray(wrongCandidates).slice(0, 3);
    const options = shuffleArray([correctWord, ...shuffledWrong]);

    setQuizQuestion({ correctWord, options });
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  }, [filteredWords]);

  const startQuizFromScratch = () => {
    const freshPool = shuffleArray([...filteredWords]);
    setQuizPool(freshPool);
    setQuizCompleted(false);
    setCorrectCountQuiz(0);
    generateQuizQuestion(freshPool);
  };

  const handleQuizAnswer = (option) => {
    if (selectedAnswer || quizCompleted) return;
    setSelectedAnswer(option);
    
    const isCorrect = option.arabic === quizQuestion.correctWord.arabic;
    setIsAnswerCorrect(isCorrect);

    setTimeout(() => {
      let updatedPool;
      if (isCorrect) {
        updatedPool = quizPool.filter(w => w.arabic !== quizQuestion.correctWord.arabic);
        setCorrectCountQuiz(prev => prev + 1);
      } else {
        updatedPool = shuffleArray([...quizPool]);
      }
      setQuizPool(updatedPool);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      generateQuizQuestion(updatedPool);
    }, 1800);
  };

  // Письмо
  const generateWriteQuestion = useCallback((currentPool) => {
    if (currentPool.length === 0) {
      setWriteCompleted(true);
      return;
    }
    const correctWord = currentPool[Math.floor(Math.random() * currentPool.length)];
    setWriteQuestion(correctWord);
    setTypedAnswer("");
    setWriteChecked(false);
    setIsWriteCorrect(null);
    setShowHint(false);
  }, []);

  const startWriteFromScratch = () => {
    const freshPool = shuffleArray([...filteredWords]);
    setWritePool(freshPool);
    setWriteCompleted(false);
    setCorrectCountWrite(0);
    generateWriteQuestion(freshPool);
  };

  // Сравнение арабского текста (игнорирует огласовки если введено без них, и пробелы)
  const cleanArabicText = (text) => {
    return text.trim().replace(/[\u064B-\u0652]/g, '').replace(/\s+/g, '');
  };

  const checkWriteAnswer = () => {
    if (writeChecked) return;
    
    const userAns = cleanArabicText(typedAnswer);
    const correctAns = cleanArabicText(writeQuestion.arabic);
    const isCorrect = userAns === correctAns;

    setIsWriteCorrect(isCorrect);
    setWriteChecked(true);

    setTimeout(() => {
      let updatedPool;
      if (isCorrect) {
        updatedPool = writePool.filter(w => w.arabic !== writeQuestion.arabic);
        setCorrectCountWrite(prev => prev + 1);
      } else {
        updatedPool = shuffleArray([...writePool]);
      }
      setWritePool(updatedPool);
      generateWriteQuestion(updatedPool);
    }, 2000);
  };

  const handleVirtualKeyPress = (char) => {
    if (writeChecked) return;
    setTypedAnswer(prev => prev + char);
  };

  const handleBackspace = () => {
    if (writeChecked) return;
    setTypedAnswer(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (writeChecked) return;
    setTypedAnswer("");
  };

  useEffect(() => {
    if (activeTab === 'quiz' && quizPool.length === filteredWords.length && !quizQuestion) {
      generateQuizQuestion(quizPool);
    }
    if (activeTab === 'write' && writePool.length === filteredWords.length && !writeQuestion) {
      generateWriteQuestion(writePool);
    }
  }, [activeTab, quizPool, quizQuestion, writePool, writeQuestion, generateQuizQuestion, generateWriteQuestion, filteredWords.length]);

  useEffect(() => {
    resetLearningState(filteredWords);
    resetQuizState(filteredWords);
    resetWriteState(filteredWords);
    setIsFilterMenuOpen(false);
  }, [activeFilter, activeLessonGroup, resetLearningState, resetQuizState, resetWriteState, filteredWords]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'auto';
    }

    const audio = audioRef.current;
    const handlePlay = () => {
      setIsAudioLoading(false);
      setIsAudioPlaying(true);
    };

    const handleLoadStart = () => {
      setIsAudioLoading(true);
      setIsAudioPlaying(false);
    };
    const handleCanPlay = () => setIsAudioLoading(false);
    const handlePause = () => setIsAudioPlaying(false);
    const handleEnded = () => setIsAudioPlaying(false);
    const handleError = () => {
      setIsAudioLoading(false);
      setIsAudioPlaying(false);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('stalled', handleError);
    audio.addEventListener('abort', handleError);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('stalled', handleError);
      audio.removeEventListener('abort', handleError);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsAudioPlaying(false);
    setIsAudioLoading(false);
    audioRequestRef.current += 1;
  }, [currentIndex, activeFilter, activeLessonGroup, activeTab]);

  const currentWord = words[currentIndex];

  const playCurrentAudio = async () => {
    if (!currentWord.audio) return;
    const audio = audioRef.current;
    if (!audio) return;

    const requestId = audioRequestRef.current + 1;
    audioRequestRef.current = requestId;
    const nextSrc = new URL(currentWord.audio, window.location.origin).href;
    const isSameSource = audioSourceRef.current === nextSrc;

    setIsAudioLoading(true);
    setIsAudioPlaying(false);

    audio.pause();

    if (!isSameSource) {
      audio.src = currentWord.audio;
      audioSourceRef.current = nextSrc;
      audio.load();
    } else {
      audio.currentTime = 0;
    }

    try {
      if (!isSameSource && audio.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        await new Promise((resolve, reject) => {
          const cleanup = () => {
            audio.removeEventListener('canplaythrough', handleReady);
            audio.removeEventListener('canplay', handleReady);
            audio.removeEventListener('error', handleFailure);
            audio.removeEventListener('stalled', handleFailure);
            audio.removeEventListener('abort', handleFailure);
          };

          const handleReady = () => {
            cleanup();
            resolve();
          };

          const handleFailure = () => {
            cleanup();
            reject(new Error('audio-load-failed'));
          };

          audio.addEventListener('canplaythrough', handleReady, { once: true });
          audio.addEventListener('canplay', handleReady, { once: true });
          audio.addEventListener('error', handleFailure, { once: true });
          audio.addEventListener('stalled', handleFailure, { once: true });
          audio.addEventListener('abort', handleFailure, { once: true });
        });
      }

      if (audioRequestRef.current !== requestId) return;

      audio.currentTime = 0;
      await audio.play();
    } catch {
      if (audioRequestRef.current !== requestId) return;

      setIsAudioLoading(false);
      setIsAudioPlaying(false);

      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioSourceRef.current = '';
    }
  };

  const audioButtonLabel = !currentWord?.audio
    ? 'Аудио пока нет'
    : 'Прослушать';

  const audioButtonAriaLabel = !currentWord?.audio
    ? 'Аудио пока нет'
    : isAudioLoading
      ? 'Аудио загружается'
      : 'Прослушать произношение';
  const openFilterMenu = () => {
    setDraftFilter(activeFilter);
    setDraftLessonGroup(activeLessonGroup);
    setIsFilterMenuOpen(true);
  };

  const applyFilters = () => {
    setActiveFilter(draftFilter);
    setActiveLessonGroup(draftLessonGroup);
    setIsFilterMenuOpen(false);
  };

  const resetDraftFilters = () => {
    setDraftFilter('all');
    setDraftLessonGroup('all');
  };

  const countWordsForType = (filter) => WORDS_DATA.filter((word) => (
    (filter.type ? word.type === filter.type : true) &&
    (draftLessonGroup === 'all' ? true : word.group === draftLessonGroup)
  )).length;

  const countWordsForLesson = (lesson) => WORDS_DATA.filter((word) => (
    (draftFilterOption.type ? word.type === draftFilterOption.type : true) &&
    (lesson.id === 'all' ? true : word.group === lesson.id)
  )).length;

  return (
    <div className={`min-h-dvh overflow-x-hidden px-3 font-sans selection:bg-indigo-100 sm:px-0 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        .arabic-text {
          font-family: "Scheherazade New", "Amiri", "Arial", sans-serif;
          line-height: 1.5;
        }
      `}} />

      <div className={`mx-auto flex min-h-dvh w-full min-w-0 max-w-none flex-col overflow-hidden shadow-xl lg:max-w-md ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        
        {/* Шапка */}
        <header className={`relative z-10 w-full min-w-0 shrink-0 overflow-visible rounded-b-[2rem] px-5 pb-6 pt-8 text-white shadow-md ${theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-600'}`}>
          <button
            type="button"
            aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            className="theme-toggle absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <div className="relative z-20 mb-4 flex w-full flex-col items-center">
            <div className="relative flex w-full items-center justify-center">
              <button
                type="button"
                onClick={openFilterMenu}
                className="inline-grid grid-cols-[18px_auto_18px] items-center gap-2 px-1 py-1 text-center text-xl font-bold leading-none text-white"
                aria-haspopup="dialog"
                aria-expanded={isFilterMenuOpen}
              >
                <span aria-hidden="true" className="flex h-[18px] w-[18px] items-center justify-center opacity-0">
                  <IconChevronDown />
                </span>
                <span>{activeFilterOption.title}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-[18px] w-[18px] items-center justify-center text-white/85 transition-transform duration-200 ${isFilterMenuOpen ? 'rotate-180' : ''}`}
                >
                  <IconChevronDown />
                </span>
              </button>
            </div>
            <p className="mt-1 max-w-full px-8 text-center text-xs leading-4 text-white/70">
              {activeLessonOption.label} · {filteredWords.length} слов
            </p>

            {isFilterMenuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Закрыть фильтры"
                  onClick={() => setIsFilterMenuOpen(false)}
                  className="fixed inset-0 z-30 cursor-default bg-slate-950/45 backdrop-blur-[1px]"
                />
                <section
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="filter-sheet-title"
                  className={`fixed inset-x-0 bottom-0 z-40 mx-auto flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[1.75rem] border-x border-t shadow-[0_-18px_50px_rgba(15,23,42,0.2)] ${
                    theme === 'dark'
                      ? 'border-slate-700 bg-slate-900 text-slate-100'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex justify-center py-2">
                    <span className={`h-1.5 w-12 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`} />
                  </div>

                  <div className={`flex items-center justify-between border-b px-4 pb-3 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div>
                      <h2 id="filter-sheet-title" className="text-lg font-bold">Выбор слов</h2>
                      <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Выберите часть речи и урок
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Закрыть фильтры"
                      onClick={() => setIsFilterMenuOpen(false)}
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none ${theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'}`}
                    >
                      ×
                    </button>
                  </div>

                  <div className="overflow-y-auto px-4 py-4">
                    <h3 className={`mb-2 text-xs font-bold uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Часть речи
                    </h3>
                    <div className="space-y-1">
                      {WORD_FILTERS.map((filter) => (
                        <button
                          key={filter.id}
                          type="button"
                          aria-pressed={draftFilter === filter.id}
                          onClick={() => setDraftFilter(filter.id)}
                          className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                            draftFilter === filter.id
                              ? theme === 'dark'
                                ? 'bg-slate-800 text-white'
                                : 'bg-indigo-50 text-indigo-700'
                              : theme === 'dark'
                                ? 'text-slate-200 hover:bg-slate-800/70'
                                : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            draftFilter === filter.id ? 'border-indigo-500' : theme === 'dark' ? 'border-slate-500' : 'border-slate-300'
                          }`}>
                            {draftFilter === filter.id && <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />}
                          </span>
                          <span className="min-w-0 flex-1">{filter.label}</span>
                          <span className={`shrink-0 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                            {countWordsForType(filter)}
                          </span>
                        </button>
                      ))}
                    </div>

                    <h3 className={`mb-2 mt-5 text-xs font-bold uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Урок
                    </h3>
                    <div className="space-y-1">
                      {LESSON_FILTERS.map((lesson) => (
                        <button
                          key={lesson.id}
                          type="button"
                          aria-pressed={draftLessonGroup === lesson.id}
                          onClick={() => setDraftLessonGroup(lesson.id)}
                          className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                            draftLessonGroup === lesson.id
                              ? theme === 'dark'
                                ? 'bg-slate-800 text-white'
                                : 'bg-indigo-50 text-indigo-700'
                              : theme === 'dark'
                                ? 'text-slate-200 hover:bg-slate-800/70'
                                : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            draftLessonGroup === lesson.id ? 'border-indigo-500' : theme === 'dark' ? 'border-slate-500' : 'border-slate-300'
                          }`}>
                            {draftLessonGroup === lesson.id && <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />}
                          </span>
                          <span className="min-w-0 flex-1 leading-5">{lesson.label}</span>
                          <span className={`shrink-0 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                            {countWordsForLesson(lesson)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`grid grid-cols-[auto_1fr] gap-3 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] ${theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                    <button
                      type="button"
                      onClick={resetDraftFilters}
                      className={`min-h-12 rounded-xl px-4 text-sm font-semibold ${theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}
                    >
                      Сбросить
                    </button>
                    <button
                      type="button"
                      onClick={applyFilters}
                      disabled={draftFilteredWords.length === 0}
                      className="min-h-12 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm disabled:bg-slate-300 disabled:text-slate-500"
                    >
                      {draftFilteredWords.length > 0
                        ? `Показать ${draftFilteredWords.length} слов`
                        : 'Нет слов'}
                    </button>
                  </div>
                </section>
              </>
            )}
          </div>

          </div>
          <div className="relative flex w-full min-w-0 overflow-hidden rounded-xl bg-indigo-700/50 p-1 text-xs">

            <button 
              onClick={() => setActiveTab('learn')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === 'learn' ? 'bg-white text-indigo-600 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              <IconBook /> Учить
            </button>
            <button 
              onClick={() => {
                setActiveTab('quiz');
                if (quizCompleted || !quizQuestion) startQuizFromScratch();
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === 'quiz' ? 'bg-white text-indigo-600 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              <IconBrain /> Тест
            </button>
            <button 
              onClick={() => {
                setActiveTab('write');
                if (writeCompleted || !writeQuestion) startWriteFromScratch();
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === 'write' ? 'bg-white text-indigo-600 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              <IconPen /> Письмо
            </button>
          </div>
        </header>

        {/* Контент */}
        <main className={`flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden px-5 pt-5 pb-[max(1rem,env(safe-area-inset-bottom))] ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
          {filteredWords.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <h2 className="mb-2 text-xl font-bold">Для этого выбора пока нет слов</h2>
              <p className="text-sm text-slate-500">
                Выберите другую часть речи или другой урок.
              </p>
            </div>
          )}

          {/* ================= КАРТОЧКИ ================= */}
          {activeTab === 'learn' && words.length > 0 && (
            <div className="flex-1 flex flex-col justify-start pt-4">
              
              {isSortedLogical && currentWord.group && (
                <div className="self-center bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {currentWord.group}
                </div>
              )}

              <div className="flex justify-between items-center mb-3 text-xs font-semibold text-slate-500 px-1">
                <span>
  {currentWord.type === WORD_TYPES.verb
    ? 'Глагол'
    : currentWord.type === WORD_TYPES.noun
      ? 'Имя'
      : 'Частица'}{' '}
  {currentIndex + 1} из {words.length}
</span>
                <div className="flex gap-1.5">
                  {isSortedLogical ? (
                    <button 
                      onClick={handleShuffle}
                      className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-lg active:scale-95 transition-all text-xs"
                    >
                      <IconShuffle /> Перемешать
                    </button>
                  ) : (
                    <button 
                      onClick={handleResetToLogical}
                      className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg active:scale-95 transition-all text-xs"
                    >
                      <IconRotateCcw /> Ассоциации
                    </button>
                  )}
                </div>
              </div>

              {/* Карточка 3D */}
              <div 
                key={currentWord.id}
                className={`relative w-full aspect-[4/3] perspective-1000 cursor-pointer touch-pan-y ${cardDirection ? `card-slide-${cardDirection}` : ''}`}
                onClick={() => setIsFlipped(!isFlipped)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEndHandler}
              >
                <div 
                  className={`w-full h-full transition-transform duration-500 ease-in-out transform-style-3d relative rounded-3xl shadow-lg ${isFlipped ? 'rotate-y-180' : ''}`}
                >
                  <div className="absolute w-full h-full backface-hidden bg-white border-2 border-slate-100 rounded-3xl flex items-center justify-center p-6 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-6xl font-bold text-slate-800 arabic-text" dir="rtl">
                        {currentWord.arabic}
                      </span>
                      <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full mt-2">
                        Нажмите для перевода
                      </span>
                    </div>
                  </div>

                  <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-3xl flex flex-col items-center justify-center p-6 text-center rotate-y-180 shadow-inner">
                    <span className="text-2xl font-bold text-white mb-3">
                      {currentWord.russian}
                    </span>
                    <div className="bg-indigo-700/50 px-4 py-1.5 rounded-xl mb-2">
                      <span className="text-base text-indigo-100 italic tracking-wide">
                        [{currentWord.transcription}]
                      </span>
                    </div>
                    {isSortedLogical && (
                      <span className="text-[11px] text-indigo-200/80 italic max-w-[90%]">
                        {currentWord.group}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 px-2">
                <button 
                  onClick={prevCard}
                  className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded-full shadow-sm active:scale-90 transition-all"
                >
                  <IconArrowLeft />
                </button>
                <div className="relative flex h-10 w-[190px] items-center justify-center">
                  <button
                    type="button"
                    disabled={!currentWord.audio || isAudioLoading}
                    aria-label={audioButtonAriaLabel}
                    onClick={playCurrentAudio}
                    className={`audio-preview flex h-10 w-[176px] items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-[transform,background-color,color,border-color,box-shadow] duration-150 ease-out active:scale-95 disabled:cursor-default ${isFlipped ? '' : 'audio-preview-front'} ${currentWord.audio ? '' : 'audio-missing'} ${isAudioPlaying ? 'audio-preview-playing' : ''}`}
                  >
                    <IconVolume />
                    {audioButtonLabel}
                  </button>
                </div>
                <button 
                  onClick={nextCard}
                  className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded-full shadow-sm active:scale-90 transition-all"
                >
                  <IconArrowRight />
                </button>
              </div>

            </div>
          )}

          {/* ================= ТЕСТ ================= */}
          {activeTab === 'quiz' && filteredWords.length > 0 && (
            <div className="flex-1 flex flex-col justify-between">
              {quizCompleted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 text-3xl">🎉</div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Великолепно!</h2>
                  <p className="text-slate-500 mb-6">Вы успешно выучили все {filteredWords.length} слов!</p>
                  <button 
                    onClick={startQuizFromScratch}
                    className="w-full bg-indigo-600 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md active:scale-95 transition-transform"
                  >
                    Пройти заново
                  </button>
                </div>
              ) : quizQuestion ? (
                <div className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                      <span>Изучено: {correctCountQuiz} из {filteredWords.length}</span>
                      <span>Осталось в пуле: {quizPool.length}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 transition-all duration-300" 
                        style={{ width: `${filteredWords.length ? (correctCountQuiz / filteredWords.length) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center mb-4 flex-1 min-h-[140px]">
                    <span className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Выберите перевод:</span>
                    <span className="text-5xl font-bold text-slate-800 arabic-text mt-1" dir="rtl">
                      {quizQuestion.correctWord.arabic}
                    </span>
                    
                    <span className={`text-xs text-slate-400 mt-2 italic transition-opacity duration-300 ${selectedAnswer ? 'opacity-100' : 'opacity-0 invisible'}`}>
                      [{quizQuestion.correctWord.transcription}]
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 mb-2">
                    {quizQuestion.options.map((option, idx) => {
                      let buttonClass = "bg-white border border-slate-200 text-slate-700 active:scale-[0.99] hover:bg-slate-50";
                      
                      if (selectedAnswer) {
                        if (option.arabic === quizQuestion.correctWord.arabic) {
                          buttonClass = "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100";
                        } else if (option.arabic === selectedAnswer.arabic && !isAnswerCorrect) {
                          buttonClass = "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-100";
                        } else {
                          buttonClass = "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(option)}
                          disabled={!!selectedAnswer}
                          className={`w-full text-left p-3.5 rounded-2xl font-semibold transition-all duration-150 flex items-center justify-between text-sm ${buttonClass}`}
                        >
                          <span>{option.russian}</span>
                          {selectedAnswer && option.arabic === quizQuestion.correctWord.arabic && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                          )}
                          {selectedAnswer && option.arabic === selectedAnswer.arabic && !isAnswerCorrect && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* ================= ПИСЬМО ================= */}
          {activeTab === 'write' && filteredWords.length > 0 && (
            <div className="flex min-h-0 flex-1 flex-col">
              {writeCompleted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 text-3xl">✍️</div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Отличный результат!</h2>
                  <p className="text-slate-500 mb-6">Вы безошибочно написали все {filteredWords.length} слов!</p>
                  <button 
                    onClick={startWriteFromScratch}
                    className="w-full bg-indigo-600 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md active:scale-95 transition-transform"
                  >
                    Пройти заново
                  </button>
                </div>
              ) : writeQuestion ? (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                        <span>Написано правильно: {correctCountWrite} из {filteredWords.length}</span>
                        <span>Осталось в пуле: {writePool.length}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 transition-all duration-300" 
                          style={{ width: `${filteredWords.length ? (correctCountWrite / filteredWords.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center relative mb-3">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">Напишите по-арабски:</span>
                      <span className="text-xl font-bold text-slate-800 block">{writeQuestion.russian}</span>
                      
                      <div className="mt-2 min-h-[24px] flex justify-center items-center">
                        {showHint ? (
                          <span className="text-xs text-indigo-500 font-medium">
                            Транскрипция: {writeQuestion.transcription}
                          </span>
                        ) : (
                          <button 
                            onClick={() => setShowHint(true)}
                            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-slate-200"
                          >
                            <IconEye /> Показать подсказку
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="relative mb-3">
                      <input 
                        type="text" 
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        placeholder="Введите арабское слово..."
                        disabled={writeChecked}
                        dir="rtl"
                        className={`w-full text-center p-3 text-2xl font-bold rounded-xl border-2 transition-all outline-none arabic-text ${
                          writeChecked 
                            ? isWriteCorrect 
                              ? "bg-emerald-50 border-emerald-500 text-emerald-800" 
                              : "bg-rose-50 border-rose-500 text-rose-800"
                            : "bg-white border-slate-200 focus:border-indigo-500"
                        }`}
                      />
                      {writeChecked && (
                        <div className="text-center mt-1.5">
                          <span className="text-xs font-semibold text-slate-400 block">Правильно:</span>
                          <span className="text-lg font-bold text-emerald-600 arabic-text" dir="rtl">{writeQuestion.arabic}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {!writeChecked && (
                    <button
                      onClick={checkWriteAnswer}
                      disabled={!typedAnswer.trim()}
                      className="w-full bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3.5 rounded-2xl shadow-sm active:scale-95 transition-all text-sm mb-3"
                    >
                      Проверить ответ
                    </button>
                  )}

                  {/* Виртуальная Клавиатура */}
                  <div className="mt-auto shrink-0 rounded-[1.5rem] bg-slate-100 p-2">
                    <div className="flex flex-col gap-1" dir="rtl">
                      {ARABIC_KEYS.map((row, rIdx) => (
                        <div key={rIdx} className="flex justify-center gap-1">
                          {row.map((char, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleVirtualKeyPress(char)}
                              disabled={writeChecked}
                              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold py-2 rounded-md shadow-sm active:bg-slate-200 disabled:opacity-50 transition-all flex items-center justify-center min-w-[18px]"
                            >
                              {char}
                            </button>
                          ))}
                        </div>
                      ))}
                      
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={handleClear}
                          disabled={writeChecked}
                          className="flex-1 bg-slate-300 text-slate-800 text-xs font-bold py-2 rounded-md hover:bg-slate-400 active:scale-95"
                        >
                          Сброс
                        </button>
                        <button
                          onClick={() => handleVirtualKeyPress(" ")}
                          disabled={writeChecked}
                          className="w-1/2 bg-white text-slate-700 py-2 rounded-md shadow-sm hover:bg-slate-50 active:scale-95 text-xs font-semibold"
                        >
                          Пробел
                        </button>
                        <button
                          onClick={handleBackspace}
                          disabled={writeChecked}
                          className="flex-1 bg-amber-200 text-amber-900 text-xs font-bold py-2 rounded-md hover:bg-amber-300 active:scale-95 flex items-center justify-center gap-0.5"
                        >
                          ← Стереть
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ) : null}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
