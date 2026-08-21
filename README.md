# Arabic Learning v6.0

Responsive Arabic vocabulary, phrase, dialogue, grammar, and verb-form trainer published at `labekasova.github.io`. Authors: Larisa, Igor.

## Release 6.0

- replaces the old exercise-first navigation with `Слова / Фразы / Справочник`;
- keeps word learning, testing, and writing as modes inside `Слова`;
- adds a searchable catalogue of 40 standalone phrases;
- adds phrase reading, translation choice, and sentence-building exercises;
- adds two article-style dialogues with 22 translated lines;
- adds a searchable verb reference with nine verbs and four basic forms;
- adds a simple verb-form recognition exercise;
- separates conversation topics from lessons for future many-to-many filtering;
- increases Arabic type sizes for comfortable phone reading.

## Stack

- React
- Vite
- Tailwind CSS
- React Router
- React Markdown
- GitHub Actions and GitHub Pages

No new runtime dependency was added in v6.0.

## Structure

- `src/App.jsx` - application shell, primary navigation, and existing word modes
- `src/data/words.js` - vocabulary data
- `src/data/phrases.js` - standalone phrase data
- `src/data/dialogues.js` - non-exercise dialogue articles
- `src/data/topics.js` - conversation-topic metadata
- `src/data/verbConjugations.js` - incrementally populated verb forms
- `src/data/lessons.js` - lesson metadata shared by words and phrases
- `src/domain/phraseSelectors.js` - phrase search, filters, shuffling, and quiz options
- `src/features/phrases/` - phrase catalogue, exercises, filters, and dialogue reader
- `src/features/verbs/` - verb reference and practice
- `src/features/rules/` - rule library and reference navigation
- `scripts/validate-learning-content.mjs` - phrase, dialogue, and verb data checks

## Routes

- `#/words/learn` - word cards
- `#/words/test` - word translation test
- `#/words/write` - Arabic writing
- `#/words/verb-forms` - verb-form practice
- `#/phrases/library` - all phrases
- `#/phrases/read` - phrase reading
- `#/phrases/translation` - translation choice
- `#/phrases/build` - sentence building
- `#/phrases/dialogues` - dialogue catalogue
- `#/phrases/dialogues/:dialogueId` - dialogue article
- `#/` - dictionary
- `#/rules` and `#/rules/:ruleId` - grammar rules
- `#/verbs` and `#/verbs/:verbId` - verb reference

## Commands

```bash
npm ci
npm run validate:data
npm run validate:learning-content
npm run validate:rules
npm run build
npm run dev
```

The GitHub Pages workflow remains in `.github/workflows/deploy.yml`.
