# People Directory

A small React SSR “People Directory” app built with a custom mini-framework (Fastify server, React `renderToString` / client hydration, and MSW for offline API mocking). The application and framework are complete; the caching fetch library is the main incomplete piece. See `DevTask.md` for the full challenge brief.

## Setup

```bash
npm i
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Tooling

Choices made while configuring the repo (Task 1). Listed in the order they were added.

### `.gitignore`

Ignores install/build output and local editor files (`node_modules`, `dist`, `.env*`, IDE folders, etc.) so generated and secret files stay out of git.

### Packages & tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Lint TypeScript/TSX via `eslint.config.mjs` (`@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`). |
| **Prettier** | Code formatting via `.prettierrc`. `eslint-config-prettier` turns off ESLint rules that conflict with Prettier. Run `npm run format` / `npm run format:check`. |
| **TypeScript** | Type-check with existing `tsconfig.json` (`strict`, `jsx: "react"`). Run `npm run typecheck` (`tsc --noEmit`). |
| **Vitest** | Unit tests for pure helpers (`application/validation.ts`, `framework/server/buildHtmlDoc.ts`). Run `npm test` / `npm run test:watch`. |
