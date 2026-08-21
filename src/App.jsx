import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LESSON_FILTERS } from './data/lessons.js';
import { RULES } from './data/rulesIndex.js';
import { WORD_GENDERS, WORDS_DATA, WORD_TYPES } from './data/words.js';
import {
  buildRepeatedRootIndex,
  filterWords,
  sortWordsByRussian
} from './domain/wordSelectors.js';
import ReferenceSwitch from './features/rules/ReferenceSwitch.jsx';
import RulesLibrary from './features/rules/RulesLibrary.jsx';

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

// Клавиатура для ввода
const ARABIC_LETTER_KEYS = [
  "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د",
  "ش", "س", "ي", "ب", "ل", "أ", "ت", "ن", "م", "ك", "ط", "ذ",
  "ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ"
];

const ARABIC_DIACRITIC_KEYS = ["َ", "ِ", "ُ", "ْ", "ّ"];

// SVG Иконки
const IconBook = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IconPen = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const IconArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const IconShuffle = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/></svg>;
const IconRotateCcw = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconVolume = ({ className = '' }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>;
const IconMoon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 1 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const IconSun = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const IconChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const IconDictionary = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v17H5.5A2.5 2.5 0 0 0 3 22Z"/><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H13v17h5.5A2.5 2.5 0 0 1 21 22Z"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconSliders = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/></svg>;
const IconChevronsUp = ({ size = 20, strokeWidth = 2.5 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="m17 11-5-5-5 5"/><path d="m17 18-5-5-5 5"/></svg>;

const getWordTypeLabel = (type) => {
  if (type === WORD_TYPES.verb) return 'Глагол';
  if (type === WORD_TYPES.noun) return 'Имя';
  return 'Частица';
};

const getWordGenderLabel = (word) => {
  if (word.type !== WORD_TYPES.noun) return null;
  if (word.gender === WORD_GENDERS.feminine) return 'ж.р.';
  if (word.gender === WORD_GENDERS.common) return 'общ.р.';
  return 'м.р.';
};

const formatWordCount = (count) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const form = lastTwoDigits >= 11 && lastTwoDigits <= 14
    ? 'слов'
    : lastDigit === 1
      ? 'слово'
      : lastDigit >= 2 && lastDigit <= 4
        ? 'слова'
        : 'слов';

  return `${count} ${form}`;
};

const formatArticleCount = (count) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const form = lastTwoDigits >= 11 && lastTwoDigits <= 14
    ? 'статей'
    : lastDigit === 1
      ? 'статья'
      : lastDigit >= 2 && lastDigit <= 4
        ? 'статьи'
        : 'статей';

  return `${count} ${form}`;
};

const toggleSelection = (selectedIds, id) => (
  selectedIds.includes(id)
    ? selectedIds.filter((selectedId) => selectedId !== id)
    : [...selectedIds, id]
);

const getTypesByFilterIds = (filterIds) => (
  WORD_FILTERS
    .filter((filter) => filterIds.includes(filter.id) && filter.type)
    .map((filter) => filter.type)
);

const formatLessonSelectionCount = (count) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const form = lastTwoDigits >= 11 && lastTwoDigits <= 14
    ? 'уроков'
    : lastDigit === 1
      ? 'урок'
      : lastDigit >= 2 && lastDigit <= 4
        ? 'урока'
        : 'уроков';

  return `${count} ${form}`;
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const audioRef = useRef(null);
  const audioRequestRef = useRef(0);
  const audioSourceRef = useRef('');
  const rulesPathMatch = location.pathname.match(/^\/rules(?:\/([^/]+))?\/?$/);
  const isRulesView = location.pathname.startsWith('/rules');
  const selectedRuleId = rulesPathMatch?.[1] ?? null;
  const [activeTab, setActiveTab] = useState('reference');
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeLessonGroups, setActiveLessonGroups] = useState([]);
  const [draftFilters, setDraftFilters] = useState([]);
  const [draftLessonGroups, setDraftLessonGroups] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [dictionaryQuery, setDictionaryQuery] = useState('');
  const [dictionaryFilters, setDictionaryFilters] = useState([]);
  const [dictionaryLessonGroups, setDictionaryLessonGroups] = useState([]);
  const [dictionaryDraftFilters, setDictionaryDraftFilters] = useState([]);
  const [dictionaryDraftLessonGroups, setDictionaryDraftLessonGroups] = useState([]);
  const [isDictionaryFilterOpen, setIsDictionaryFilterOpen] = useState(false);
  const [isDictionaryScrollTopVisible, setIsDictionaryScrollTopVisible] = useState(false);
  const [expandedRoot, setExpandedRoot] = useState(null);
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
  const [activeAudioPath, setActiveAudioPath] = useState(null);
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

  const activeFilterTitle = activeFilters.length === 0
    ? WORD_FILTERS[0].title
    : activeFilters.length === 1
      ? WORD_FILTERS.find((filter) => filter.id === activeFilters[0])?.title ?? WORD_FILTERS[0].title
      : `${activeFilters.length} части речи`;
  const activeLessonTitle = activeLessonGroups.length === 0
    ? LESSON_FILTERS[0].label
    : activeLessonGroups.length === 1
      ? LESSON_FILTERS.find((lesson) => lesson.id === activeLessonGroups[0])?.label ?? LESSON_FILTERS[0].label
      : formatLessonSelectionCount(activeLessonGroups.length);
  const filteredWords = useMemo(() => filterWords(WORDS_DATA, {
    types: getTypesByFilterIds(activeFilters),
    lessonIds: activeLessonGroups
  }), [activeFilters, activeLessonGroups]);
  const draftFilteredWords = useMemo(() => filterWords(WORDS_DATA, {
    types: getTypesByFilterIds(draftFilters),
    lessonIds: draftLessonGroups
  }), [draftFilters, draftLessonGroups]);
  const dictionaryWords = useMemo(() => sortWordsByRussian(filterWords(WORDS_DATA, {
    types: getTypesByFilterIds(dictionaryFilters),
    lessonIds: dictionaryLessonGroups,
    query: dictionaryQuery
  })), [dictionaryFilters, dictionaryLessonGroups, dictionaryQuery]);
  const dictionaryDraftWords = useMemo(() => filterWords(WORDS_DATA, {
    types: getTypesByFilterIds(dictionaryDraftFilters),
    lessonIds: dictionaryDraftLessonGroups,
    query: dictionaryQuery
  }), [dictionaryDraftFilters, dictionaryDraftLessonGroups, dictionaryQuery]);
  const repeatedRootIndex = useMemo(() => buildRepeatedRootIndex(WORDS_DATA), []);
  const dictionaryActiveFilterCount = dictionaryFilters.length + dictionaryLessonGroups.length;

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
  }, [activeFilters, activeLessonGroups, resetLearningState, resetQuizState, resetWriteState, filteredWords]);

  useEffect(() => {
    setIsFilterMenuOpen(false);
    setIsDictionaryFilterOpen(false);
  }, [activeTab]);

  useEffect(() => {
    if (isRulesView) {
      setActiveTab('reference');
    }
  }, [isRulesView]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    mainRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    if (activeTab !== 'reference' || isRulesView) {
      setIsDictionaryScrollTopVisible(false);
      return undefined;
    }

    const updateVisibility = () => {
      const scrollPosition = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        mainRef.current?.scrollTop ?? 0
      );
      setIsDictionaryScrollTopVisible(scrollPosition > 240);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    mainRef.current?.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      mainRef.current?.removeEventListener('scroll', updateVisibility);
    };
  }, [activeTab, isRulesView]);

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
    const handlePause = () => {
      setIsAudioPlaying(false);
      setActiveAudioPath(null);
    };
    const handleEnded = () => {
      setIsAudioPlaying(false);
      setActiveAudioPath(null);
    };
    const handleError = () => {
      setIsAudioLoading(false);
      setIsAudioPlaying(false);
      setActiveAudioPath(null);
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
    setActiveAudioPath(null);
    audioRequestRef.current += 1;
  }, [currentIndex, activeFilters, activeLessonGroups, activeTab]);

  const currentWord = words[currentIndex];

  const playWordAudio = async (word) => {
    if (!word.audio) return;
    const audio = audioRef.current;
    if (!audio) return;

    const requestId = audioRequestRef.current + 1;
    audioRequestRef.current = requestId;
    const nextSrc = new URL(word.audio, window.location.origin).href;
    const isSameSource = audioSourceRef.current === nextSrc;

    setIsAudioLoading(true);
    setIsAudioPlaying(false);

    audio.pause();
    setActiveAudioPath(word.audio);

    if (!isSameSource) {
      audio.src = word.audio;
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
      setActiveAudioPath(null);

      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioSourceRef.current = '';
    }
  };

  const playCurrentAudio = () => playWordAudio(currentWord);

  const audioButtonLabel = !currentWord?.audio
    ? 'Аудио пока нет'
    : 'Прослушать';

  const audioButtonAriaLabel = !currentWord?.audio
    ? 'Аудио пока нет'
    : isAudioLoading
      ? 'Аудио загружается'
      : 'Прослушать произношение';
  const openFilterMenu = () => {
    setDraftFilters([...activeFilters]);
    setDraftLessonGroups([...activeLessonGroups]);
    setIsFilterMenuOpen(true);
  };

  const applyFilters = () => {
    setActiveFilters([...draftFilters]);
    setActiveLessonGroups([...draftLessonGroups]);
    setIsFilterMenuOpen(false);
  };

  const resetDraftFilters = () => {
    setDraftFilters([]);
    setDraftLessonGroups([]);
  };

  const toggleDraftFilter = (filterId) => {
    setDraftFilters((selectedIds) => (
      filterId === 'all' ? [] : toggleSelection(selectedIds, filterId)
    ));
  };

  const toggleDraftLessonGroup = (lessonId) => {
    setDraftLessonGroups((selectedIds) => (
      lessonId === 'all' ? [] : toggleSelection(selectedIds, lessonId)
    ));
  };

  const countWordsForType = (filter) => filterWords(WORDS_DATA, {
    types: filter.type ? [filter.type] : [],
    lessonIds: draftLessonGroups
  }).length;

  const countWordsForLesson = (lesson) => filterWords(WORDS_DATA, {
    types: getTypesByFilterIds(draftFilters),
    lessonIds: lesson.id === 'all' ? [] : [lesson.id]
  }).length;

  const openDictionaryFilterMenu = () => {
    setDictionaryDraftFilters([...dictionaryFilters]);
    setDictionaryDraftLessonGroups([...dictionaryLessonGroups]);
    setIsDictionaryFilterOpen(true);
  };

  const applyDictionaryFilters = () => {
    setDictionaryFilters([...dictionaryDraftFilters]);
    setDictionaryLessonGroups([...dictionaryDraftLessonGroups]);
    setExpandedRoot(null);
    setIsDictionaryFilterOpen(false);
  };

  const resetDictionaryDraftFilters = () => {
    setDictionaryDraftFilters([]);
    setDictionaryDraftLessonGroups([]);
  };

  const toggleDictionaryDraftFilter = (filterId) => {
    setDictionaryDraftFilters((selectedIds) => (
      filterId === 'all' ? [] : toggleSelection(selectedIds, filterId)
    ));
  };

  const toggleDictionaryDraftLessonGroup = (lessonId) => {
    setDictionaryDraftLessonGroups((selectedIds) => (
      lessonId === 'all' ? [] : toggleSelection(selectedIds, lessonId)
    ));
  };

  const resetDictionaryView = () => {
    setDictionaryQuery('');
    setDictionaryFilters([]);
    setDictionaryLessonGroups([]);
    setDictionaryDraftFilters([]);
    setDictionaryDraftLessonGroups([]);
    setExpandedRoot(null);
  };

  const countDictionaryWordsForType = (filter) => filterWords(WORDS_DATA, {
    types: filter.type ? [filter.type] : [],
    lessonIds: dictionaryDraftLessonGroups,
    query: dictionaryQuery
  }).length;

  const countDictionaryWordsForLesson = (lesson) => filterWords(WORDS_DATA, {
    types: getTypesByFilterIds(dictionaryDraftFilters),
    lessonIds: lesson.id === 'all' ? [] : [lesson.id],
    query: dictionaryQuery
  }).length;

  const scrollDictionaryToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openReferenceView = (view) => {
    setActiveTab('reference');
    setIsFilterMenuOpen(false);
    setIsDictionaryFilterOpen(false);
    navigate(view === 'rules' ? '/rules' : '/');
  };

  const openStudyTab = (tab) => {
    navigate('/');
    setActiveTab(tab);
  };

  return (
    <div className={`app-viewport min-h-dvh overflow-x-hidden font-sans selection:bg-indigo-100 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
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

      <div className={`app-shell mx-auto flex min-h-dvh w-full min-w-0 flex-col overflow-hidden shadow-xl ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        
        {/* Шапка */}
        <header className={`app-header relative z-10 w-full min-w-0 shrink-0 overflow-visible text-white shadow-md ${theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-600'}`}>
          <button
            type="button"
            aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            className="theme-toggle absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <div className="relative z-20 mb-4 flex w-full flex-col items-center sm:mb-5">
            <div className="relative flex w-full items-center justify-center">
              <button
                type="button"
                onClick={activeTab === 'reference' ? undefined : openFilterMenu}
                disabled={activeTab === 'reference'}
                className="inline-grid max-w-[calc(100%-4.5rem)] grid-cols-[18px_minmax(0,auto)_18px] items-center gap-2 px-1 py-1 text-center text-lg font-bold leading-tight text-white sm:text-xl"
                aria-haspopup={activeTab === 'reference' ? undefined : 'dialog'}
                aria-expanded={activeTab === 'reference' ? undefined : isFilterMenuOpen}
              >
                <span aria-hidden="true" className="flex h-[18px] w-[18px] items-center justify-center opacity-0">
                  <IconChevronDown />
                </span>
                <span className="min-w-0 break-words">{activeTab === 'reference' ? 'Справочник' : activeFilterTitle}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-[18px] w-[18px] items-center justify-center text-white/85 transition-transform duration-200 ${activeTab === 'reference' ? 'opacity-0' : ''} ${isFilterMenuOpen ? 'rotate-180' : ''}`}
                >
                  <IconChevronDown />
                </span>
              </button>
            </div>
            <p className="mt-1 max-w-2xl px-10 text-center text-xs leading-5 text-white/75 sm:px-12">
              {activeTab === 'reference'
                ? isRulesView
                  ? `Правила · ${formatArticleCount(RULES.length)}`
                  : `Словарь · ${formatWordCount(dictionaryWords.length)} из ${WORDS_DATA.length}`
                : `${activeLessonTitle} · ${formatWordCount(filteredWords.length)}`}
            </p>

            {isFilterMenuOpen && activeTab !== 'reference' && (
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
                  className={`responsive-sheet fixed inset-x-0 bottom-0 z-40 mx-auto flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[1.75rem] border-x border-t shadow-[0_-18px_50px_rgba(15,23,42,0.2)] ${
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
                        Можно выбрать несколько вариантов
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
                          role="checkbox"
                          aria-checked={filter.id === 'all' ? draftFilters.length === 0 : draftFilters.includes(filter.id)}
                          onClick={() => toggleDraftFilter(filter.id)}
                          className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                            (filter.id === 'all' ? draftFilters.length === 0 : draftFilters.includes(filter.id))
                              ? theme === 'dark'
                                ? 'bg-slate-800 text-white'
                                : 'bg-indigo-50 text-indigo-700'
                              : theme === 'dark'
                                ? 'text-slate-200 hover:bg-slate-800/70'
                                : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                            (filter.id === 'all' ? draftFilters.length === 0 : draftFilters.includes(filter.id)) ? 'border-indigo-500 bg-indigo-500 text-white' : theme === 'dark' ? 'border-slate-500' : 'border-slate-300'
                          }`}>
                            {(filter.id === 'all' ? draftFilters.length === 0 : draftFilters.includes(filter.id)) && (
                              <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                            )}
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
                          role="checkbox"
                          aria-checked={lesson.id === 'all' ? draftLessonGroups.length === 0 : draftLessonGroups.includes(lesson.id)}
                          onClick={() => toggleDraftLessonGroup(lesson.id)}
                          className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                            (lesson.id === 'all' ? draftLessonGroups.length === 0 : draftLessonGroups.includes(lesson.id))
                              ? theme === 'dark'
                                ? 'bg-slate-800 text-white'
                                : 'bg-indigo-50 text-indigo-700'
                              : theme === 'dark'
                                ? 'text-slate-200 hover:bg-slate-800/70'
                                : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                            (lesson.id === 'all' ? draftLessonGroups.length === 0 : draftLessonGroups.includes(lesson.id)) ? 'border-indigo-500 bg-indigo-500 text-white' : theme === 'dark' ? 'border-slate-500' : 'border-slate-300'
                          }`}>
                            {(lesson.id === 'all' ? draftLessonGroups.length === 0 : draftLessonGroups.includes(lesson.id)) && (
                              <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                            )}
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
                      className="min-h-12 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm"
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

          <div className="app-primary-nav relative grid min-h-12 w-full min-w-0 grid-cols-4 overflow-hidden rounded-xl bg-indigo-700/50 p-1 text-[10px] min-[430px]:text-xs">

            <button
              onClick={() => openReferenceView(isRulesView ? 'rules' : 'dictionary')}
              className={`flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 font-medium transition-all duration-300 min-[430px]:flex-row min-[430px]:gap-1.5 ${activeTab === 'reference' ? 'bg-white text-indigo-600 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              <IconDictionary /> <span>Справочник</span>
            </button>
            <button 
              onClick={() => openStudyTab('learn')}
              className={`flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 font-medium transition-all duration-300 min-[430px]:flex-row min-[430px]:gap-1.5 ${activeTab === 'learn' ? 'bg-white text-indigo-600 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              <IconBook /> <span>Учить</span>
            </button>
            <button 
              onClick={() => {
                openStudyTab('quiz');
                if (quizCompleted || !quizQuestion) startQuizFromScratch();
              }}
              className={`flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 font-medium transition-all duration-300 min-[430px]:flex-row min-[430px]:gap-1.5 ${activeTab === 'quiz' ? 'bg-white text-indigo-600 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              <IconBrain /> <span>Тест</span>
            </button>
            <button 
              onClick={() => {
                openStudyTab('write');
                if (writeCompleted || !writeQuestion) startWriteFromScratch();
              }}
              className={`flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 font-medium transition-all duration-300 min-[430px]:flex-row min-[430px]:gap-1.5 ${activeTab === 'write' ? 'bg-white text-indigo-600 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              <IconPen /> <span>Письмо</span>
            </button>
          </div>
        </header>

        {/* Контент */}
        <main ref={mainRef} className={`app-main flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
          {activeTab !== 'reference' && filteredWords.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <h2 className="mb-2 text-xl font-bold">Для этого выбора пока нет слов</h2>
              <p className="text-sm text-slate-500">
                Выберите другую часть речи или другой урок.
              </p>
            </div>
          )}

          {/* ================= КАРТОЧКИ ================= */}
          {activeTab === 'learn' && words.length > 0 && (
            <div className="content-standard flex w-full flex-1 flex-col justify-start pt-2 sm:pt-4 lg:pt-2">
              
              {isSortedLogical && currentWord.group && (
                <div className="mb-4 max-w-full self-center rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-center text-xs font-semibold leading-5 text-indigo-700">
                  {currentWord.group}
                </div>
              )}

              <div className="mb-3 flex flex-col gap-2 px-1 text-xs font-semibold text-slate-500 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
                <span className="flex min-w-0 items-center gap-1.5">
                  <span>{getWordTypeLabel(currentWord.type)}</span>
                  {getWordGenderLabel(currentWord) && (
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      theme === 'dark' ? 'bg-slate-800 text-indigo-200' : 'bg-indigo-50 text-indigo-700'
                    }`}>
                      {getWordGenderLabel(currentWord)}
                    </span>
                  )}
                  <span>{currentIndex + 1} из {words.length}</span>
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
                className={`relative aspect-[4/3] w-full cursor-pointer touch-pan-y perspective-1000 sm:aspect-[16/10] lg:aspect-[16/9] ${cardDirection ? `card-slide-${cardDirection}` : ''}`}
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
                      <span className="arabic-text text-5xl font-bold text-slate-800 sm:text-6xl lg:text-7xl" dir="rtl">
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
                    {getWordGenderLabel(currentWord) && (
                      <span className="mb-2 rounded-md bg-white/15 px-2 py-1 text-[11px] font-semibold text-indigo-100">
                        Имя · {getWordGenderLabel(currentWord)}
                      </span>
                    )}
                    {isSortedLogical && (
                      <span className="text-[11px] text-indigo-200/80 italic max-w-[90%]">
                        {currentWord.group}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between px-1 sm:mt-6 sm:px-2">
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
            <div className="content-standard flex w-full flex-1 flex-col justify-between">
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

                  <div className="mb-5 flex min-h-[160px] flex-1 flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:min-h-[220px] sm:p-8">
                    <span className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Выберите перевод:</span>
                    <span className="text-5xl font-bold text-slate-800 arabic-text mt-1" dir="rtl">
                      {quizQuestion.correctWord.arabic}
                    </span>
                    
                    <span className={`text-xs text-slate-400 mt-2 italic transition-opacity duration-300 ${selectedAnswer ? 'opacity-100' : 'opacity-0 invisible'}`}>
                      [{quizQuestion.correctWord.transcription}]
                    </span>
                  </div>

                  <div className="mb-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
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
                          className={`flex min-h-14 w-full items-center justify-between rounded-2xl p-3.5 text-left text-sm font-semibold transition-all duration-150 sm:p-4 ${buttonClass}`}
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
            <div className="content-wide flex min-h-0 w-full flex-1 flex-col">
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
                <div className="flex flex-1 flex-col justify-between lg:justify-start">
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
                  <div className={`mt-auto shrink-0 rounded-2xl p-2.5 sm:p-3 lg:mt-6 ${theme === 'dark' ? 'bg-slate-800/70' : 'bg-slate-100'}`}>
                    <div className="grid grid-cols-6 gap-1.5 min-[390px]:grid-cols-7 sm:grid-cols-8 lg:grid-cols-10 lg:gap-2" dir="rtl">
                      {ARABIC_LETTER_KEYS.map((char) => (
                        <button
                          key={char}
                          onClick={() => handleVirtualKeyPress(char)}
                          disabled={writeChecked}
                          className={`arabic-text flex min-h-11 min-w-0 items-center justify-center rounded-lg border text-xl font-bold leading-none shadow-sm transition-all active:scale-95 disabled:opacity-50 sm:min-h-12 sm:text-2xl ${
                            theme === 'dark'
                              ? 'border-slate-700 bg-slate-900 text-slate-100 active:bg-slate-700'
                              : 'border-slate-200 bg-white text-slate-800 active:bg-slate-200'
                          }`}
                        >
                          {char}
                        </button>
                      ))}
                    </div>

                    <div className="mt-1.5 grid grid-cols-5 gap-1.5" dir="rtl">
                      {ARABIC_DIACRITIC_KEYS.map((char) => (
                        <button
                          key={char}
                          onClick={() => handleVirtualKeyPress(char)}
                          disabled={writeChecked}
                          className={`arabic-text flex min-h-11 items-center justify-center rounded-lg border text-4xl font-bold leading-none shadow-sm transition-all active:scale-95 disabled:opacity-50 ${
                            theme === 'dark'
                              ? 'border-slate-700 bg-slate-900 text-indigo-200 active:bg-slate-700'
                              : 'border-slate-200 bg-white text-indigo-700 active:bg-slate-200'
                          }`}
                        >
                          {'◌' + char}
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 grid grid-cols-[1fr_1.5fr_1fr] gap-1.5">
                      <button
                        onClick={handleBackspace}
                        disabled={writeChecked}
                        className="flex min-h-12 items-center justify-center rounded-lg bg-amber-200 px-2 text-xs font-bold text-amber-900 transition-all active:scale-95 disabled:opacity-50"
                      >
                        Стереть ←
                      </button>

                      <button
                        onClick={() => handleVirtualKeyPress(" ")}
                        disabled={writeChecked}
                        className={`min-h-12 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50 ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-700'}`}
                      >
                        Пробел
                      </button>

                      <button
                        onClick={handleClear}
                        disabled={writeChecked}
                        className={`min-h-12 rounded-lg px-2 text-xs font-bold transition-all active:scale-95 disabled:opacity-50 ${theme === 'dark' ? 'bg-slate-700 text-slate-100' : 'bg-slate-300 text-slate-800'}`}
                      >
                        Сброс
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* ================= СЛОВАРЬ ================= */}
          {activeTab === 'reference' && !isRulesView && (
            <section className="reference-layout flex w-full flex-col">
              <div className={`reference-toolbar sticky top-0 z-[5] border-b ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900'
                  : 'border-slate-100 bg-white'
              }`}>
                <div className="reference-controls">
                  <ReferenceSwitch activeView="dictionary" onChange={openReferenceView} theme={theme} />
                  <label className="relative mt-3 block lg:mt-0">
                  <span className={`pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    <IconSearch />
                  </span>
                  <input
                    type="search"
                    value={dictionaryQuery}
                    onChange={(event) => {
                      setDictionaryQuery(event.target.value);
                      setExpandedRoot(null);
                    }}
                    placeholder="Перевод, арабское слово или транскрипция"
                    autoComplete="off"
                    aria-label="Поиск по словарю"
                    className={`min-h-12 w-full rounded-xl border py-2 pl-11 pr-11 text-base outline-none transition-colors ${
                      theme === 'dark'
                        ? 'border-slate-700 bg-slate-800 text-slate-100 focus:border-indigo-400'
                        : 'border-slate-200 bg-slate-50 text-slate-800 focus:border-indigo-500'
                    }`}
                  />
                  {dictionaryQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setDictionaryQuery('');
                        setExpandedRoot(null);
                      }}
                      aria-label="Очистить поиск"
                      className={`absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-2xl leading-none ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      ×
                    </button>
                  )}
                  </label>
                </div>

                <div className="mt-3 flex min-w-0 items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={openDictionaryFilterMenu}
                    aria-haspopup="dialog"
                    aria-expanded={isDictionaryFilterOpen}
                    className={`flex min-h-11 shrink-0 items-center gap-2 rounded-lg border px-3 text-sm font-semibold ${
                      theme === 'dark'
                        ? 'border-slate-700 bg-slate-800 text-slate-100'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <IconSliders />
                    <span>Фильтры</span>
                    {dictionaryActiveFilterCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs text-white">
                        {dictionaryActiveFilterCount}
                      </span>
                    )}
                  </button>
                  <span className={`min-w-0 text-right text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} aria-live="polite">
                    Найдено: {formatWordCount(dictionaryWords.length)}
                  </span>
                </div>

                {dictionaryActiveFilterCount > 0 && (
                  <div className="mt-3 flex min-w-0 flex-wrap gap-2">
                    {dictionaryFilters.map((filterId) => {
                      const filter = WORD_FILTERS.find((item) => item.id === filterId);
                      if (!filter) return null;

                      return (
                        <button
                          key={filter.id}
                          type="button"
                          onClick={() => {
                            setDictionaryFilters((currentFilters) => currentFilters.filter((id) => id !== filter.id));
                            setExpandedRoot(null);
                          }}
                          aria-label={`Убрать фильтр ${filter.title}`}
                          className={`flex min-h-9 max-w-full items-center gap-2 rounded-lg px-3 text-left text-xs font-semibold ${
                            theme === 'dark' ? 'bg-slate-800 text-indigo-200' : 'bg-indigo-50 text-indigo-700'
                          }`}
                        >
                          <span className="min-w-0 truncate">{filter.title}</span>
                          <span aria-hidden="true" className="shrink-0 text-lg leading-none">×</span>
                        </button>
                      );
                    })}
                    {dictionaryLessonGroups.map((lessonId) => {
                      const lesson = LESSON_FILTERS.find((item) => item.id === lessonId);
                      if (!lesson) return null;

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => {
                            setDictionaryLessonGroups((currentLessons) => currentLessons.filter((id) => id !== lesson.id));
                            setExpandedRoot(null);
                          }}
                          aria-label={`Убрать фильтр ${lesson.label}`}
                          className={`flex min-h-9 max-w-full items-center gap-2 rounded-lg px-3 text-left text-xs font-semibold ${
                            theme === 'dark' ? 'bg-slate-800 text-indigo-200' : 'bg-indigo-50 text-indigo-700'
                          }`}
                        >
                          <span className="min-w-0 truncate">{lesson.label}</span>
                          <span aria-hidden="true" className="shrink-0 text-lg leading-none">×</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {dictionaryWords.length > 0 ? (
                <ul className="reference-results-grid">
                  {dictionaryWords.map((word) => {
                    const rootWords = word.root ? repeatedRootIndex[word.root] ?? [] : [];
                    const relatedWords = rootWords.filter((rootWord) => rootWord.id !== word.id);
                    const isRootExpanded = expandedRoot === word.root && relatedWords.length > 0;
                    const isDictionaryAudioActive = Boolean(word.audio) && activeAudioPath === word.audio;

                    return (
                      <li key={word.id} className={`border-b py-4 sm:py-5 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(92px,auto)] items-start gap-3">
                          <div className="min-w-0">
                            <p className={`break-words text-base font-bold leading-6 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                              {word.russian}
                            </p>
                            <div className="mt-0.5 min-w-0">
                              {word.audio ? (
                                <button
                                  type="button"
                                  onClick={() => playWordAudio(word)}
                                  aria-label={`Прослушать произношение: ${word.arabic}`}
                                  aria-pressed={activeAudioPath === word.audio && isAudioPlaying}
                                  data-playing={isDictionaryAudioActive}
                                  className={`dictionary-audio-trigger -my-1 inline-flex min-h-8 max-w-full items-center gap-1 rounded-md py-1 pr-1 text-left text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:text-indigo-700 ${
                                    isDictionaryAudioActive
                                      ? 'text-indigo-600'
                                      : theme === 'dark'
                                        ? 'text-slate-400 hover:text-indigo-300'
                                        : 'text-slate-500 hover:text-indigo-600'
                                  }`}
                                >
                                  <span>[{word.transcription}]</span>
                                  <IconVolume className="relative top-px h-3.5 w-3.5" />
                                  <span className="sr-only">Прослушать</span>
                                </button>
                              ) : (
                                <span
                                  className={`inline-flex min-h-8 items-center py-1 text-sm ${
                                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                                  }`}
                                >
                                  [{word.transcription}]
                                </span>
                              )}
                            </div>
                            <p className={`mt-2 break-words text-xs leading-5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                              {getWordTypeLabel(word.type)}
                              {getWordGenderLabel(word) ? ` · ${getWordGenderLabel(word)}` : ''}
                              {' · '}
                              {word.group}
                            </p>
                          </div>
                          <div className="min-w-0 text-right" dir="rtl">
                            <span className={`arabic-text block break-words text-[2rem] font-bold leading-[1.7] ${theme === 'dark' ? 'text-indigo-100' : 'text-slate-800'}`}>
                              {word.arabic}
                            </span>
                          </div>
                        </div>

                        {relatedWords.length > 0 && (
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => setExpandedRoot((currentRoot) => currentRoot === word.root ? null : word.root)}
                              aria-expanded={isRootExpanded}
                              className={`min-h-9 text-left text-sm font-semibold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`}
                            >
                              {isRootExpanded ? (
                                'Скрыть однокоренные'
                              ) : (
                                <>
                                  Показать однокоренные · корень{' '}
                                  <bdi dir="rtl" className="arabic-text">{word.root}</bdi>
                                </>
                              )}
                            </button>

                            {isRootExpanded && (
                              <div className={`border-l-2 py-1 pl-3 ${theme === 'dark' ? 'border-indigo-500/50' : 'border-indigo-200'}`}>
                                {relatedWords.map((relatedWord) => (
                                  <div key={relatedWord.id} className="flex min-w-0 items-baseline justify-between gap-3 py-1.5">
                                    <span className={`min-w-0 break-words text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                                      {relatedWord.russian}
                                    </span>
                                    <span className={`arabic-text shrink-0 text-2xl font-bold ${theme === 'dark' ? 'text-indigo-100' : 'text-slate-800'}`} dir="rtl">
                                      {relatedWord.arabic}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="flex min-h-[45dvh] flex-col items-center justify-center px-5 text-center">
                  <h2 className="text-xl font-bold">
                    {dictionaryQuery ? 'Ничего не найдено' : 'Для этих фильтров пока нет слов'}
                  </h2>
                  <p className={`mt-2 max-w-xs text-sm leading-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Измените запрос или сбросьте фильтры словаря.
                  </p>
                  <button
                    type="button"
                    onClick={resetDictionaryView}
                    className="mt-5 min-h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white"
                  >
                    Сбросить поиск и фильтры
                  </button>
                </div>
              )}

              {isDictionaryFilterOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Закрыть фильтры словаря"
                    onClick={() => setIsDictionaryFilterOpen(false)}
                    className="fixed inset-0 z-30 cursor-default bg-slate-950/45 backdrop-blur-[1px]"
                  />
                  <section
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="dictionary-filter-title"
                    className={`responsive-sheet fixed inset-x-0 bottom-0 z-40 mx-auto flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[1.75rem] border-x border-t shadow-[0_-18px_50px_rgba(15,23,42,0.2)] ${
                      theme === 'dark'
                        ? 'border-slate-700 bg-slate-900 text-slate-100'
                        : 'border-slate-200 bg-white text-slate-800'
                    }`}
                  >
                    <div className="flex justify-center py-2">
                      <span className={`h-1.5 w-12 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`} />
                    </div>
                    <div className={`flex items-center justify-between border-b px-4 pb-3 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                      <div>
                        <h2 id="dictionary-filter-title" className="text-lg font-bold">Фильтры словаря</h2>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          Часть речи и урок
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Закрыть фильтры словаря"
                        onClick={() => setIsDictionaryFilterOpen(false)}
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none ${theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'}`}
                      >
                        ×
                      </button>
                    </div>

                    <div className="space-y-5 overflow-y-auto px-4 py-5">
                      <div>
                        <h3 className={`mb-2 text-xs font-bold uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          Часть речи
                        </h3>
                        <div className="space-y-1">
                          {WORD_FILTERS.map((filter) => {
                            const isSelected = filter.id === 'all'
                              ? dictionaryDraftFilters.length === 0
                              : dictionaryDraftFilters.includes(filter.id);

                            return (
                              <button
                                key={filter.id}
                                type="button"
                                role="checkbox"
                                aria-checked={isSelected}
                                onClick={() => toggleDictionaryDraftFilter(filter.id)}
                                className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                                  isSelected
                                    ? theme === 'dark'
                                      ? 'bg-slate-800 text-white'
                                      : 'bg-indigo-50 text-indigo-700'
                                    : theme === 'dark'
                                      ? 'text-slate-200 hover:bg-slate-800/70'
                                      : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                                  isSelected
                                    ? 'border-indigo-500 bg-indigo-500'
                                    : theme === 'dark'
                                      ? 'border-slate-500'
                                      : 'border-slate-300'
                                }`}>
                                  {isSelected && <span className="h-2.5 w-2.5 rounded-sm bg-white" />}
                                </span>
                                <span className="min-w-0 flex-1">{filter.label}</span>
                                <span className={`shrink-0 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {countDictionaryWordsForType(filter)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h3 className={`mb-2 text-xs font-bold uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          Урок
                        </h3>
                        <div className="space-y-1">
                          {LESSON_FILTERS.map((lesson) => {
                            const isSelected = lesson.id === 'all'
                              ? dictionaryDraftLessonGroups.length === 0
                              : dictionaryDraftLessonGroups.includes(lesson.id);

                            return (
                              <button
                                key={lesson.id}
                                type="button"
                                role="checkbox"
                                aria-checked={isSelected}
                                onClick={() => toggleDictionaryDraftLessonGroup(lesson.id)}
                                className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                                  isSelected
                                    ? theme === 'dark'
                                      ? 'bg-slate-800 text-white'
                                      : 'bg-indigo-50 text-indigo-700'
                                    : theme === 'dark'
                                      ? 'text-slate-200 hover:bg-slate-800/70'
                                      : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                                  isSelected
                                    ? 'border-indigo-500 bg-indigo-500'
                                    : theme === 'dark'
                                      ? 'border-slate-500'
                                      : 'border-slate-300'
                                }`}>
                                  {isSelected && <span className="h-2.5 w-2.5 rounded-sm bg-white" />}
                                </span>
                                <span className="min-w-0 flex-1 leading-5">{lesson.label}</span>
                                <span className={`shrink-0 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {countDictionaryWordsForLesson(lesson)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <p className={`text-center text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} aria-live="polite">
                        Будет показано: {formatWordCount(dictionaryDraftWords.length)}
                      </p>
                    </div>

                    <div className={`grid grid-cols-[auto_1fr] gap-3 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] ${theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                      <button
                        type="button"
                        onClick={resetDictionaryDraftFilters}
                        className={`min-h-12 rounded-xl px-4 text-sm font-semibold ${theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}
                      >
                        Сбросить
                      </button>
                      <button
                        type="button"
                        onClick={applyDictionaryFilters}
                        className="min-h-12 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm"
                      >
                        Показать {formatWordCount(dictionaryDraftWords.length)}
                      </button>
                    </div>
                  </section>
                </>
              )}

              <button
                type="button"
                onClick={scrollDictionaryToTop}
                aria-label="Вернуться к началу словаря"
                style={{ transform: isDictionaryScrollTopVisible ? 'translateY(0)' : 'translateY(0.75rem)' }}
                className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg transition-all duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                  isDictionaryScrollTopVisible
                    ? 'opacity-100'
                    : 'pointer-events-none opacity-0'
                } ${
                  theme === 'dark'
                    ? 'border-slate-600 bg-slate-800/95 text-indigo-200 shadow-slate-950/30 hover:bg-slate-700'
                    : 'border-indigo-100 bg-white/95 text-indigo-600 shadow-indigo-950/15 hover:bg-indigo-50'
                }`}
              >
                <IconChevronsUp size={21} strokeWidth={2.4} />
              </button>
            </section>
          )}

          {/* ================= ПРАВИЛА ================= */}
          {activeTab === 'reference' && isRulesView && (
            <RulesLibrary
              selectedRuleId={selectedRuleId}
              onOpenRule={(ruleId) => navigate(`/rules/${ruleId}`)}
              onBackToRules={() => navigate('/rules')}
              onReferenceChange={openReferenceView}
              theme={theme}
            />
          )}

        </main>
      </div>
    </div>
  );
}
