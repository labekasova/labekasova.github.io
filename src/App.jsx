import React, { useState, useEffect, useCallback } from 'react';

// Логически сгруппированный набор слов (всего 23 уникальных смысловых глагола из фото без лишних дубликатов)
const WORDS_DATA = [
  // --- ГРУППА 1: Положение тела, движение и ВОДНАЯ логическая цепочка ---
  { id: 19, arabic: "وَقَفَ", transcription: "waqafa", russian: "стоял", group: "Положение тела и движение" },
  { id: 2, arabic: "جَلَسَ", transcription: "jalasa", russian: "сидел", group: "Положение тела и движение" },
  { id: 16, arabic: "نَزَلَ", transcription: "nazala", russian: "спускался", group: "Положение тела и движение" },
  { id: 24, arabic: "سَبَحَ", transcription: "sabaḥa", russian: "плыл", group: "Вода: движение" },
  { id: 25, arabic: "شَرِبَ", transcription: "shariba", russian: "пил", group: "Вода: употребление" },
  { id: 7, arabic: "غَسَلَ", transcription: "ghasala", russian: "стирал / мыл", group: "Вода: чистота" },
  
  // --- ГРУППА 2: Организм, разум и память ---
  { id: 18, arabic: "مَرِضَ", transcription: "mariḍa", russian: "болел", group: "Состояние тела" },
  { id: 5, arabic: "فَهِمَ", transcription: "fahima", russian: "понял", group: "Разум и память" },
  { id: 21, arabic: "حَفِظَ", transcription: "ḥafiẓa", russian: "запоминал", group: "Разум и память" },

  // --- ГРУППА 3: Взаимодействие с предметами ---
  { id: 20, arabic: "أَخَذَ", transcription: "'akhaḍha", russian: "взял / забрал", group: "Действия руками" },
  { id: 17, arabic: "حَمَلَ", transcription: "ḥamala", russian: "нёс", group: "Действия руками" },
  { id: 15, arabic: "دَفَعَ", transcription: "ḍafa'a", russian: "толкал", group: "Действия руками" },
  { id: 14, arabic: "رَبَطَ", transcription: "rabaṭa", russian: "завязал", group: "Действия руками" },
  { id: 4, arabic: "هَدَمَ", transcription: "hadama", russian: "разрушил", group: "Действия руками" },
  { id: 8, arabic: "وَجَدَ", transcription: "wajada", russian: "нашёл", group: "Действия руками" },
  { id: 11, arabic: "عَمِلَ", transcription: "'amila", russian: "сделал / выполнил", group: "Действия руками" },

  // --- ГРУППА 4: Творчество и активность ---
  { id: 9, arabic: "رَسَمَ", transcription: "rasama", russian: "рисовал", group: "Творчество и активность" },
  { id: 13, arabic: "نَفَخَ", transcription: "nafaḥa", russian: "надул", group: "Творчество и активность" },
  { id: 10, arabic: "ضَرَبَ", transcription: "daraba", russian: "ударил", group: "Творчество и активность" },

  // --- ГРУППА 5: Речь, общение и вера ---
  { id: 12, arabic: "سَكَتَ", transcription: "sakata", russian: "молчал", group: "Общение и дух" },
  { id: 6, arabic: "شَكَرَ", transcription: "shakara", russian: "поблагодарил", group: "Общение и дух" },
  { id: 3, arabic: "حَمِدَ", transcription: "hamida", russian: "воздал хвалу [Богу]", group: "Общение и дух" },
  { id: 1, arabic: "سَجَدَ", transcription: "sajada", russian: "совершил земной поклон", group: "Общение и дух" }
];

// SVG Иконки для интерфейса
const IconBook = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const IconArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const IconShuffle = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/></svg>;
const IconRotateCcw = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;

export default function App() {
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' или 'quiz'
  
  // По умолчанию слова идут по нашей новой водной цепочке ассоциаций
  const [words, setWords] = useState([...WORDS_DATA]);
  const [isSortedLogical, setIsSortedLogical] = useState(true);
  
  // Состояние для режима карточек
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Состояние для свайпов
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Состояние для режима теста
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  // Алгоритм перемешивания
  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Перемешать карточки для проверки
  const handleShuffle = () => {
    setWords(shuffleArray(WORDS_DATA));
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSortedLogical(false);
  };

  // Сбросить к новой логической цепочке
  const handleResetToLogical = () => {
    setWords([...WORDS_DATA]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSortedLogical(true);
  };

  // Навигация по карточкам
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

  // Обработка свайпов для телефона
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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }
  };

  // Генерация вопроса для теста
  const generateQuizQuestion = useCallback(() => {
    const currentWord = WORDS_DATA[Math.floor(Math.random() * WORDS_DATA.length)];
    const availableWrong = WORDS_DATA.filter(w => w.arabic !== currentWord.arabic);
    const wrongAnswers = shuffleArray(availableWrong).slice(0, 3);
    const options = shuffleArray([currentWord, ...wrongAnswers]);
    
    setQuizQuestion({
      correctWord: currentWord,
      options: options
    });
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  }, []);

  // Инициализация теста при переключении таба
  useEffect(() => {
    if (activeTab === 'quiz' && !quizQuestion) {
      generateQuizQuestion();
    }
  }, [activeTab, quizQuestion, generateQuizQuestion]);

  // Обработка ответа в тесте
  const handleAnswerSelect = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    const correct = option.arabic === quizQuestion.correctWord.arabic;
    setIsAnswerCorrect(correct);
    
    if (correct) {
      setQuizScore(prev => prev + 1);
    }
    setQuizTotal(prev => prev + 1);

    setTimeout(() => {
      generateQuizQuestion();
    }, 1500);
  };

  const currentWord = words[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* 3D стили и арабский шрифт */}
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
        <header className="bg-indigo-600 text-white p-5 pt-8 rounded-b-3xl shadow-md z-10">
          <h1 className="text-2xl font-bold text-center mb-6">Арабский: Ассоциации</h1>
          
          {/* Переключатель режимов */}
          <div className="flex bg-indigo-700/50 rounded-xl p-1 relative">
            <button 
              onClick={() => setActiveTab('learn')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'learn' ? 'bg-white text-indigo-600 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              <IconBook /> Учить
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'quiz' ? 'bg-white text-indigo-600 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              <IconBrain /> Тест
            </button>
          </div>
        </header>

        {/* Основной контент */}
        <main className="flex-1 flex flex-col p-5">
          
          {/* РЕЖИМ КАРТОЧЕК */}
          {activeTab === 'learn' && words.length > 0 && (
            <div className="flex-1 flex flex-col justify-center">
              
              {/* Поясняющая категория / связь слов */}
              {isSortedLogical && currentWord.group && (
                <div className="self-center bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
                  Связь: {currentWord.group}
                </div>
              )}

              {/* Управление порядком */}
              <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-500 px-1">
                <span>Глагол {currentIndex + 1} из {words.length}</span>
                <div className="flex gap-2">
                  {isSortedLogical ? (
                    <button 
                      onClick={handleShuffle}
                      className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg active:scale-95 transition-transform"
                      title="Перемешать слова"
                    >
                      <IconShuffle /> Перемешать
                    </button>
                  ) : (
                    <button 
                      onClick={handleResetToLogical}
                      className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg active:scale-95 transition-transform"
                      title="Восстановить логический порядок"
                    >
                      <IconRotateCcw /> По ассоциациям
                    </button>
                  )}
                </div>
              </div>

              {/* Карточка */}
              <div 
                className="relative w-full aspect-[4/3] perspective-1000 cursor-pointer touch-pan-y"
                onClick={() => setIsFlipped(!isFlipped)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEndHandler}
              >
                <div 
                  className={`w-full h-full transition-transform duration-500 ease-in-out transform-style-3d relative rounded-3xl shadow-xl ${isFlipped ? 'rotate-y-180' : ''}`}
                >
                  {/* Лицевая сторона (Арабский) */}
                  <div className="absolute w-full h-full backface-hidden bg-white border-2 border-slate-100 rounded-3xl flex items-center justify-center p-6 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-7xl font-bold text-slate-800 arabic-text" dir="rtl">
                        {currentWord.arabic}
                      </span>
                      <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full mt-4">
                        Нажмите для перевода
                      </span>
                    </div>
                  </div>

                  {/* Обратная сторона (Перевод) */}
                  <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-3xl flex flex-col items-center justify-center p-6 text-center rotate-y-180 shadow-inner">
                    <span className="text-3xl font-bold text-white mb-4">
                      {currentWord.russian}
                    </span>
                    <div className="bg-indigo-700/50 px-5 py-2 rounded-xl mb-3">
                      <span className="text-lg text-indigo-100 italic tracking-wide">
                        [{currentWord.transcription}]
                      </span>
                    </div>
                    {isSortedLogical && (
                      <span className="text-xs text-indigo-200/80 italic max-w-[80%]">
                        Логическая цепочка: {currentWord.group}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Кнопки навигации */}
              <div className="flex justify-between items-center mt-8 px-4">
                <button 
                  onClick={prevCard}
                  className="w-14 h-14 flex items-center justify-center bg-white border-2 border-slate-100 text-slate-600 rounded-full shadow-sm active:scale-90 active:bg-slate-50 transition-all"
                >
                  <IconArrowLeft />
                </button>
                <span className="text-xs text-slate-400">Свайп влево/вправо</span>
                <button 
                  onClick={nextCard}
                  className="w-14 h-14 flex items-center justify-center bg-white border-2 border-slate-100 text-slate-600 rounded-full shadow-sm active:scale-90 active:bg-slate-50 transition-all"
                >
                  <IconArrowRight />
                </button>
              </div>

            </div>
          )}

          {/* РЕЖИМ ТЕСТА */}
          {activeTab === 'quiz' && quizQuestion && (
            <div className="flex-1 flex flex-col">
              
              <div className="flex justify-between items-center mb-6 bg-slate-100 px-4 py-3 rounded-2xl">
                <span className="text-slate-600 font-medium">Ваш счет:</span>
                <span className="text-indigo-600 font-bold text-lg">{quizScore} / {quizTotal}</span>
              </div>

              <div className="flex-1 flex flex-col">
                {/* Вопрос */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center mb-6 flex-1 min-h-[160px]">
                  <span className="text-sm text-slate-400 mb-2 uppercase tracking-wider font-semibold">Как переводится?</span>
                  <span className="text-6xl font-bold text-slate-800 arabic-text mt-2" dir="rtl">
                    {quizQuestion.correctWord.arabic}
                  </span>
                </div>

                {/* Варианты ответов */}
                <div className="flex flex-col gap-3">
                  {quizQuestion.options.map((option, index) => {
                    let buttonClass = "bg-white border-2 border-slate-100 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 active:scale-[0.98]";
                    
                    if (selectedAnswer) {
                      if (option.arabic === quizQuestion.correctWord.arabic) {
                        buttonClass = "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-200";
                      } else if (option.id === selectedAnswer.id && !isAnswerCorrect) {
                        buttonClass = "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-200";
                      } else {
                        buttonClass = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={!!selectedAnswer}
                        className={`w-full text-left p-4 rounded-2xl font-medium transition-all duration-200 flex items-center justify-between ${buttonClass}`}
                      >
                        <span className="text-lg">{option.russian}</span>
                        
                        {selectedAnswer && option.arabic === quizQuestion.correctWord.arabic && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        )}
                        {selectedAnswer && option.id === selectedAnswer.id && !isAnswerCorrect && (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
