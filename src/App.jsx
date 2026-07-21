import React, { useState, useEffect, useCallback } from 'react';

// Полная логическая база из 39 уникальных глаголов со всех фотографий
const WORDS_DATA = [
  // --- ГРУППА 1: Помещение, жилье и движение ---
  { id: 101, arabic: "دَخَلَ", transcription: "dakhala", russian: "вошёл", group: "Помещение и движение" },
  { id: 102, arabic: "خَرَجَ", transcription: "kharaja", russian: "вышел", group: "Помещение и движение" },
  { id: 19,  arabic: "وَقَفَ", transcription: "waqafa", russian: "стоял", group: "Помещение и движение" },
  { id: 2,   arabic: "جَلَسَ", transcription: "jalasa", russian: "сидел", group: "Помещение и движение" },
  { id: 16,  arabic: "نَزَلَ", transcription: "nazala", russian: "спускался", group: "Помещение и движение" },
  { id: 103, arabic: "سَكَنَ", transcription: "sakana", russian: "жил / проживал", group: "Помещение и движение" },

  // --- ГРУППА 2: Отель, визиты и действия ---
  { id: 104, arabic: "حَجَزَ", transcription: "ḥajaza", russian: "забронировал", group: "Поездка и визиты" },
  { id: 105, arabic: "طَلَبَ", transcription: "ṭalaba", russian: "потребовал / попросил", group: "Поездка и визиты" },
  { id: 106, arabic: "طَرَقَ", transcription: "ṭaraqa", russian: "постучался", group: "Поездка и визиты" },
  { id: 107, arabic: "ظَهَرَ", transcription: "ẓahara", russian: "появился", group: "Поездка и визиты" },

  // --- ГРУППА 3: Вода и Еда ---
  { id: 24,  arabic: "سَبَحَ", transcription: "sabaḥa", russian: "плыл", group: "Вода и Еда" },
  { id: 25,  arabic: "شَرِبَ", transcription: "shariba", russian: "пил", group: "Вода и Еда" },
  { id: 108, arabic: "أَكَلَ", transcription: "'akala", russian: "покушал / ел", group: "Вода и Еда" },
  { id: 7,   arabic: "غَسَلَ", transcription: "ghasala", russian: "стирал / мыл", group: "Вода и Еда" },

  // --- ГРУППА 4: Одежда и Состояние организма ---
  { id: 109, arabic: "لَبِسَ", transcription: "labisa", russian: "одел / надел", group: "Одежда и состояние" },
  { id: 18,  arabic: "مَرِضَ", transcription: "mariḍa", russian: "болел", group: "Одежда и состояние" },
  { id: 110, arabic: "فَرِحَ", transcription: "fariḥa", russian: "обрадовался", group: "Одежда и состояние" },

  // --- ГРУППА 5: Учёба, разум и знания ---
  { id: 5,   arabic: "فَهِمَ", transcription: "fahima", russian: "понял", group: "Учёба и знания" },
  { id: 21,  arabic: "حَفِظَ", transcription: "ḥafiẓa", russian: "запоминал", group: "Учёба и знания" },
  { id: 111, arabic: "دَرَسَ", transcription: "darasa", russian: "учил / учился", group: "Учёба и знания" },
  { id: 112, arabic: "عَلِمَ", transcription: "'alima", russian: "знал", group: "Учёба и знания" },
  { id: 113, arabic: "قَرَأَ", transcription: "qara'a", russian: "читал", group: "Учёба и знания" },
  { id: 114, arabic: "كَتَبَ", transcription: "kataba", russian: "писал", group: "Учёба и знания" },

  // --- ГРУППА 6: Взаимодействие с предметами (руки) ---
  { id: 20,  arabic: "أَخَذَ", transcription: "'akhaḍha", russian: "взял / забрал", group: "Действия руками" },
  { id: 115, arabic: "وَضَعَ", transcription: "waḍa'a", russian: "положил", group: "Действия руками" },
  { id: 116, arabic: "مَسَكَ", transcription: "masaka", russian: "держал", group: "Действия руками" },
  { id: 17,  arabic: "حَمَلَ", transcription: "ḥamala", russian: "нёс", group: "Действия руками" },
  { id: 15,  arabic: "دَفَعَ", transcription: "ḍafa'a", russian: "толкал", group: "Действия руками" },
  { id: 14,  arabic: "رَبَطَ", transcription: "rabaṭa", russian: "завязал", group: "Действия руками" },
  { id: 4,   arabic: "هَدَمَ", transcription: "hadama", russian: "разрушил", group: "Действия руками" },
  { id: 117, arabic: "فَقَدَ", transcription: "faqada", russian: "потерял", group: "Действия руками" },
  { id: 8,   arabic: "وَجَدَ", transcription: "wajada", russian: "нашёл", group: "Действия руками" },
  { id: 11,  arabic: "عَمِلَ", transcription: "'amila", russian: "сделал / выполнил", group: "Действия руками" },

  // --- ГРУППА 7: Творчество, управление и активность ---
  { id: 9,   arabic: "رَسَمَ", transcription: "rasama", russian: "рисовал", group: "Творчество и активность" },
  { id: 13,  arabic: "نَفَخَ", transcription: "nafaḥa", russian: "надул", group: "Творчество и активность" },
  { id: 10,  arabic: "ضَرَبَ", transcription: "daraba", russian: "ударил", group: "Творчество и активность" },
  { id: 118, arabic: "حَكَمَ", transcription: "ḥakama", russian: "управлял / судил", group: "Творчество и активность" },
  { id: 119, arabic: "نَظَرَ", transcription: "naẓara", russian: "смотрел", group: "Творчество и активность" },

  // --- ГРУППА 8: Речь, общение и вера ---
  { id: 12,  arabic: "سَكَتَ", transcription: "sakata", russian: "молчал", group: "Общение и дух" },
  { id: 6,   arabic: "شَكَرَ", transcription: "shakara", russian: "поблагодарил", group: "Общение и дух" },
  { id: 3,   arabic: "حَمِدَ", transcription: "hamida", russian: "воздал хвалу [Богу]", group: "Общение и дух" },
  { id: 1,   arabic: "سَجَدَ", transcription: "sajada", russian: "совершил земной поклон", group: "Общение и дух" }
];

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

export default function App() {
  const [activeTab, setActiveTab] = useState('learn'); // 'learn', 'quiz' или 'write'
  
  // Состояния карточек
  const [words, setWords] = useState([...WORDS_DATA]);
  const [isSortedLogical, setIsSortedLogical] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Состояния Теста
  const [quizPool, setQuizPool] = useState([...WORDS_DATA]); 
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctCountQuiz, setCorrectCountQuiz] = useState(0);

  // Состояния Письма
  const [writePool, setWritePool] = useState([...WORDS_DATA]); 
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

  // Обучение
  const handleShuffle = () => {
    setWords(shuffleArray(WORDS_DATA));
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSortedLogical(false);
  };

  const handleResetToLogical = () => {
    setWords([...WORDS_DATA]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSortedLogical(true);
  };

  const nextCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 150);
  }, [words.length]);

  const prevCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    }, 150);
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
    const wrongCandidates = WORDS_DATA.filter(w => w.arabic !== correctWord.arabic);
    const shuffledWrong = shuffleArray(wrongCandidates).slice(0, 3);
    const options = shuffleArray([correctWord, ...shuffledWrong]);

    setQuizQuestion({ correctWord, options });
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  }, []);

  const startQuizFromScratch = () => {
    const freshPool = shuffleArray([...WORDS_DATA]);
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
    const freshPool = shuffleArray([...WORDS_DATA]);
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
    if (activeTab === 'quiz' && quizPool.length === WORDS_DATA.length && !quizQuestion) {
      generateQuizQuestion(quizPool);
    }
    if (activeTab === 'write' && writePool.length === WORDS_DATA.length && !writeQuestion) {
      generateWriteQuestion(writePool);
    }
  }, [activeTab, quizPool, quizQuestion, writePool, writeQuestion, generateQuizQuestion, generateWriteQuestion]);

  const currentWord = words[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100">
      
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

      <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white shadow-xl relative overflow-hidden">
        
        {/* Шапка */}
        <header className="bg-indigo-600 text-white p-4 pt-6 rounded-b-3xl shadow-md z-10">
          <h1 className="text-xl font-bold text-center mb-1">Арабские глаголы</h1>
          <p className="text-center text-xs text-indigo-200 mb-4">База знаний: {WORDS_DATA.length} слов</p>
          
          <div className="flex bg-indigo-700/50 rounded-xl p-1 relative text-xs">
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
        <main className="flex-1 flex flex-col p-4 overflow-y-auto">
          
          {/* ================= КАРТОЧКИ ================= */}
          {activeTab === 'learn' && words.length > 0 && (
            <div className="flex-1 flex flex-col justify-center">
              
              {isSortedLogical && currentWord.group && (
                <div className="self-center bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  Связь: {currentWord.group}
                </div>
              )}

              <div className="flex justify-between items-center mb-3 text-xs font-semibold text-slate-500 px-1">
                <span>Глагол {currentIndex + 1} из {words.length}</span>
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
                className="relative w-full aspect-[4/3] perspective-1000 cursor-pointer touch-pan-y"
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
                        Группа: {currentWord.group}
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
                <span className="text-xs text-slate-400">Свайпайте влево/вправо</span>
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
          {activeTab === 'quiz' && (
            <div className="flex-1 flex flex-col justify-between">
              {quizCompleted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 text-3xl">🎉</div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Великолепно!</h2>
                  <p className="text-slate-500 mb-6">Вы успешно выучили все {WORDS_DATA.length} слов!</p>
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
                      <span>Изучено: {correctCountQuiz} из {WORDS_DATA.length}</span>
                      <span>Осталось в пуле: {quizPool.length}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 transition-all duration-300" 
                        style={{ width: `${(correctCountQuiz / WORDS_DATA.length) * 100}%` }}
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
          {activeTab === 'write' && (
            <div className="flex-1 flex flex-col justify-between">
              {writeCompleted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 text-3xl">✍️</div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Отличный результат!</h2>
                  <p className="text-slate-500 mb-6">Вы безошибочно написали все {WORDS_DATA.length} глаголов!</p>
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
                        <span>Написано правильно: {correctCountWrite} из {WORDS_DATA.length}</span>
                        <span>Осталось в пуле: {writePool.length}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 transition-all duration-300" 
                          style={{ width: `${(correctCountWrite / WORDS_DATA.length) * 100}%` }}
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
                  <div className="bg-slate-100 p-2 rounded-2xl mt-auto">
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
