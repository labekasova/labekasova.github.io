import { TOPIC_IDS } from './topics.js';

export const DIALOGUES_DATA = [
  {
    id: 'introduction-with-zayd',
    title: 'Знакомство с Зейдом',
    summary: 'Приветствие, знакомство и короткий рассказ о себе.',
    topicIds: [TOPIC_IDS.greetings, TOPIC_IDS.introductions, TOPIC_IDS.personalQuestions],
    lessonIds: [],
    participants: [
      { id: 'speaker-a', label: 'Зейд' },
      { id: 'speaker-b', label: 'Мухаммад' }
    ],
    lines: [
      {
        id: 'greeting-1',
        speakerId: 'speaker-a',
        arabic: 'السَّلَامُ عَلَيْكُمْ',
        transcription: 'as-salaamu 3alaykum',
        russian: 'Привет / Мир вам!',
        phraseId: null
      },
      {
        id: 'greeting-2',
        speakerId: 'speaker-b',
        arabic: 'وَعَلَيْكُمُ السَّلَامُ',
        transcription: 'wa 3alaykumu as-salaam',
        russian: 'И вам тоже мир.',
        phraseId: null
      },
      {
        id: 'name-question-1',
        speakerId: 'speaker-a',
        arabic: 'مَا اسْمُكَ؟',
        transcription: 'maa ismuka?',
        russian: 'Как тебя зовут?',
        phraseId: null
      },
      {
        id: 'name-answer-1',
        speakerId: 'speaker-b',
        arabic: 'اِسْمِي مُحَمَّدٌ',
        transcription: 'ismii Muhammad',
        russian: 'Меня зовут Магомед.',
        phraseId: null
      },
      {
        id: 'name-question-2',
        speakerId: 'speaker-b',
        arabic: 'وَمَا اسْمُكَ؟',
        transcription: 'wa maa ismuka?',
        russian: 'А как зовут тебя?',
        phraseId: null
      },
      {
        id: 'name-answer-2',
        speakerId: 'speaker-a',
        arabic: 'اِسْمِي زَيْدٌ وَأَنَا طَالِبٌ',
        transcription: 'ismii Zayd wa 2anaa taalib',
        russian: 'Меня зовут Зейд, и я студент.',
        phraseId: null
      },
      {
        id: 'how-are-you',
        speakerId: 'speaker-b',
        arabic: 'كَيْفَ حَالُكَ؟',
        transcription: 'kayfa haaluka?',
        russian: 'Как твои дела?',
        phraseId: null
      },
      {
        id: 'doing-well',
        speakerId: 'speaker-a',
        arabic: 'الْحَمْدُ لِلّٰهِ بِخَيْرٍ',
        transcription: 'al-hamdu lillaahi bikhayr',
        russian: 'Хвала Аллаху, хорошо.',
        phraseId: null
      },
      {
        id: 'where-from',
        speakerId: 'speaker-b',
        arabic: 'مِنْ أَيْنَ أَنْتَ؟',
        transcription: 'min 2ayna anta?',
        russian: 'Откуда ты?',
        phraseId: null
      },
      {
        id: 'from-russia',
        speakerId: 'speaker-a',
        arabic: 'أَنَا مِنْ رُوسِيَا',
        transcription: '2anaa min Ruusiyaa',
        russian: 'Я из России.',
        phraseId: null
      },
      {
        id: 'welcome',
        speakerId: 'speaker-b',
        arabic: 'أَهْلًا وَسَهْلًا',
        transcription: '2ahlan wa sahlan',
        russian: 'Добро пожаловать.',
        phraseId: null
      },
      {
        id: 'farewell',
        speakerId: 'speaker-a',
        arabic: 'مَعَ السَّلَامَةِ',
        transcription: 'ma3a as-salaama',
        russian: 'Пока / С миром.',
        phraseId: null
      }
    ]
  },
  {
    id: 'conversation-with-muhammad',
    title: 'Разговор с Мухаммадом',
    summary: 'Встреча, вопрос о делах, дороге в школу и местонахождении людей.',
    topicIds: [TOPIC_IDS.greetings, TOPIC_IDS.location, TOPIC_IDS.everydayActions],
    lessonIds: [],
    participants: [
      { id: 'speaker-a', label: 'Собеседник 1' },
      { id: 'speaker-b', label: 'Собеседник 2' }
    ],
    lines: [
      {
        id: 'hello-muhammad',
        speakerId: 'speaker-a',
        arabic: 'مَرْحَبًا مُحَمَّدُ',
        transcription: 'marhaban Muhammad',
        russian: 'Привет, Мухаммад.',
        phraseId: null
      },
      {
        id: 'hello-how-are-you',
        speakerId: 'speaker-b',
        arabic: 'مَرْحَبًا، كَيْفَ حَالُكَ؟',
        transcription: 'marhaban, kayfa haaluka?',
        russian: 'Привет, как дела?',
        phraseId: null
      },
      {
        id: 'well-and-you',
        speakerId: 'speaker-a',
        arabic: 'الْحَمْدُ لِلّٰهِ جَيِّدٌ، وَأَنْتَ؟',
        transcription: 'al-hamdu lillaahi jayyid, wa 2anta?',
        russian: 'Хвала Аллаху, хорошо, а твои?',
        phraseId: null
      },
      {
        id: 'where-are-you-going',
        speakerId: 'speaker-b',
        arabic: 'الْحَمْدُ لِلّٰهِ جَيِّدٌ، أَيْنَ تَذْهَبُ؟',
        transcription: 'al-hamdu lillaahi jayyid, 2ayna tadhhabu?',
        russian: 'Хвала Аллаху, хорошо, куда идёшь?',
        phraseId: null
      },
      {
        id: 'to-school',
        speakerId: 'speaker-a',
        arabic: 'إِلَى الْمَدْرَسَةِ',
        transcription: '2ilaa al-madrasa',
        russian: 'В школу.',
        phraseId: null
      },
      {
        id: 'goodbye',
        speakerId: 'speaker-b',
        arabic: 'مَعَ السَّلَامَةِ',
        transcription: 'ma3a as-salaama',
        russian: 'До свидания.',
        phraseId: null
      },
      {
        id: 'where-is-muhammad',
        speakerId: 'speaker-a',
        arabic: 'أَيْنَ مُحَمَّدٌ؟',
        transcription: '2ayna Muhammad?',
        russian: 'Где Мухаммад?',
        phraseId: null
      },
      {
        id: 'muhammad-in-room',
        speakerId: 'speaker-b',
        arabic: 'مُحَمَّدٌ فِي الْحُجْرَةِ',
        transcription: 'Muhammad fii al-hujra',
        russian: 'Мухаммад в комнате.',
        phraseId: null
      },
      {
        id: 'where-is-boy',
        speakerId: 'speaker-a',
        arabic: 'أَيْنَ وَلَدٌ؟',
        transcription: '2ayna walad?',
        russian: 'Где мальчик?',
        phraseId: null
      },
      {
        id: 'he-makes-wudu',
        speakerId: 'speaker-b',
        arabic: 'هُوَ يَتَوَضَّأُ',
        transcription: 'huwa yatawadda2u',
        russian: 'Он делает омовение.',
        phraseId: null
      }
    ]
  }
];

export const DIALOGUE_BY_ID = Object.fromEntries(
  DIALOGUES_DATA.map((dialogue) => [dialogue.id, dialogue])
);
