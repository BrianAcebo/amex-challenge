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
| *(add entries here as tooling is installed — e.g. ESLint, Prettier, Vitest)* | |
