# People Directory

A small React SSR “People Directory” app built with a custom mini-framework (Fastify server, React `renderToString` / client hydration, and MSW for offline API mocking). The application and framework are complete; the caching fetch library is the main incomplete piece. See `DevTask.md` for the full challenge brief.

## Setup

```bash
npm i
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Fly.io + GitHub Actions)

This app is a Node server (not a static site). It deploys to [Fly.io](https://fly.io) via Docker.

### One-time setup

1. Install the CLI and log in: `fly auth login`
2. Create the app (name must match `app` in `fly.toml`):

```bash
fly apps create amex-challenge
# if you chose another name, update `app` in fly.toml to match
```

3. Deploy once from your machine to verify:

```bash
fly deploy
```

4. In the GitHub repo → **Settings → Secrets and variables → Actions**, add:
   - `FLY_API_TOKEN` — create with `fly tokens create deploy`

5. Merge/push to `main`. [`.github/workflows/fly.yml`](.github/workflows/fly.yml) runs `flyctl deploy --remote-only`.

### Notes

- Server listens on `0.0.0.0` and `process.env.PORT` (Fly sets `PORT`)
- Image builds with the repo `Dockerfile` (`npm run build`, then `node dist/server.js`)

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
| **Vitest** | Unit tests for pure helpers (`application/validation.ts`, `framework/server/buildHtmlDoc.ts`) and the caching fetch hook. Run `npm test` / `npm run test:watch`. |
| **React Testing Library** | Used with Vitest (`@testing-library/react` + `jsdom`) to test React hooks like `useCachingFetch` via `renderHook`. |
| **Playwright** | E2E smoke tests in `e2e/` (landing page + app shell). Starts the app via `npm start`. Run `npm run test:e2e` (requires `npx playwright install chromium` once). |
