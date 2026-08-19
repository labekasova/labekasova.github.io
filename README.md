# Arabic Words Learning v4.2.1

Mobile-first Arabic vocabulary trainer published at `labekasova.github.io`. Authors: Larisa, Igor.

Release 4.2.1 adds the particles taught in the grammar reference to every learning mode and completes the shared-root links for the current vocabulary.

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
- `src/content/rules/*.md` - one Markdown article per language rule
- `src/domain/wordSelectors.js` - filtering, search, sorting, and root indexing
- `src/features/rules/ReferenceSwitch.jsx` - dictionary/rules switch
- `src/features/rules/RulesLibrary.jsx` - rule list, search, and article reader
- `scripts/validate-word-data.mjs` - vocabulary integrity checks
- `scripts/validate-rule-content.mjs` - article completeness and ordering checks

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

The GitHub Pages deployment workflow is stored in `.github/workflows/deploy.yml`.
