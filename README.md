# Arabic Words Learning v5.0

Mobile-first Arabic vocabulary trainer published at `labekasova.github.io`. Authors: Larisa, Igor.

Release 5.0 introduces responsive layouts for phones, tablets, laptops, and wide desktop screens. It adds adaptive spacing, a wider desktop workspace, two-column reference lists, responsive learning modes, and desktop filter dialogs.

## Stack

- React
- Vite
- Tailwind CSS
- React Router
- React Markdown
- GitHub Actions and GitHub Pages

## Structure

- `src/App.jsx` - application shell, dictionary, and learning modes
- `src/data/words.js` - vocabulary data
- `src/data/lessons.js` - lesson metadata
- `src/data/rulesIndex.js` - rule metadata and searchable index
- `src/content/rules/` - one Markdown article per language rule
- `src/domain/wordSelectors.js` - filtering, search, sorting, and root indexing
- `src/features/rules/ReferenceSwitch.jsx` - dictionary/rules switch
- `src/features/rules/RulesLibrary.jsx` - rule list, search, and article reader
- `scripts/validate-word-data.mjs` - vocabulary integrity checks
- `scripts/validate-rule-content.mjs` - article completeness and ordering checks
- `scripts/validate-dictionary-audio.mjs` - dictionary audio coverage check
- `scripts/validate-rule-language.mjs` - rule transcription and audio mapping check

Additional technical notes are in `docs/`.

## Reference routes

- `#/` - dictionary
- `#/rules` - rules index
- `#/rules/:ruleId` - individual rule article

## Commands

```bash
npm ci
npm run validate:data
npm run validate:rules
npm run build
npm run dev
```

On Windows, `start-dev.cmd` can be launched with a double click. It installs the locked dependencies on first run and opens the local current version in the browser.

The GitHub Pages deployment workflow is stored in `.github/workflows/deploy.yml`.
