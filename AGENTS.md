# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React + TypeScript app with a local-only architecture.

- `src/main.tsx` bootstraps the app.
- `src/App.tsx` and `src/App.css` hold the top-level UI.
- `src/presentation/` contains page and component UI code.
- `src/application/` contains application use cases and services.
- `src/domain/` holds entities, repository interfaces, errors, and domain use cases.
- `src/infra/local-storage/` contains browser storage implementations.
- `public/` stores static assets such as `favicon.svg`.

The `@` alias maps to `src/` in `vite.config.ts`.

## Build, Test, and Development Commands

- `pnpm install` installs dependencies.
- `pnpm dev` starts the Vite dev server.
- `pnpm build` runs TypeScript project build and production bundling.
- `pnpm lint` runs ESLint across the repository.
- `pnpm preview` serves the production build locally.

There is no automated test script in `package.json` yet.

## Coding Style & Naming Conventions

- Use TypeScript with ES modules and React function components.
- Follow the existing code style: single quotes, minimal semicolons, and 2-space indentation.
- Prefer descriptive file names that match the exported concept, for example `create-user.usecase.ts` or `auth-card.tsx`.
- Keep domain, application, infra, and presentation concerns separated.
- Use the `@/` alias for imports from `src/` instead of long relative paths when practical.
- Avoid Any and workarounds that is just a different Any. Unless extremally necessary, always prefer typing.
- Do not use non-descriptive, single-letter or generic names for variables, functions or consts, even in iterators.
- Avoid comments, if your code really needs a comment, it probably should be refactored to be more clear.
- Prefer to use existant components over creating new ones when applicable.
- Follow acessibility rules when building interfaces, including semantic html, constrasts and keyboard controls, using aria tags.
 

Linting is defined in `eslint.config.js` using the recommended JS, TypeScript, React Hooks, and React Refresh rules.

## Testing Guidelines

No test framework is configured yet. If you add tests, place them near the code they cover and use clear names such as `user.repository.test.ts` or `auth-page.test.tsx`. Add the corresponding run command to `package.json`.

## Commit & Pull Request Guidelines

Git history uses Conventional Commits, for example `feat: user usecases` and `chore: add daisyui`. Keep commit subjects short and imperative.

Pull requests should include:

- A short summary of the change and why it exists.
- Screenshots or screen recordings for UI changes.
- Notes about any new commands, config, or migration steps.

## Security & Configuration Tips

This app stores data locally in the browser. Avoid introducing secrets into the repo or persisting sensitive data in `localStorage` without a clear reason.
