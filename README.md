# Arabic Words Learning v3.0

Mobile-first Arabic vocabulary trainer published at `labekasova.github.io`. Authors: Larisa, Igor.

## Stack

- React
- Vite
- Tailwind CSS
- GitHub Actions and GitHub Pages

## Structure

- `src/App.jsx` - application UI and learning modes
- `src/data/words.js` - vocabulary data
- `src/data/lessons.js` - lesson metadata
- `src/domain/wordSelectors.js` - filtering, search, sorting, and root indexing
- `scripts/validate-word-data.mjs` - vocabulary integrity checks

## Commands

```bash
npm ci
npm run validate:data
npm run build
npm run dev
```

The GitHub Pages deployment workflow is stored in `.github/workflows/deploy.yml`.
