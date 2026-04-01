## Repo snapshot

- This is a React (Create React App) based admin dashboard using `react-app-rewired`.
- Key folders: `src/` (application code), `public/` (static assets copied to build), `build/` (compiled output), `config-overrides.js` (webpack rewires/aliases), `package.json` (scripts).

## Primary developer workflows

- Start dev server: `npm start` (runs `react-app-rewired start`).
- Normal build: `npm run build` (uses `react-app-rewired build`).
- Windows-specific production build: `npm run mybuild` — note it runs `set PUBLIC_URL=/Admin&&react-app-rewired build` (Windows `cmd` style `set`).
- Run tests: `npm test` (wrapps CRA test runner).
- Lint: `npm run lint` and `npm run lint:fix`.

When making changes to webpack aliases or loaders, update `config-overrides.js` (it's used by `react-app-rewired`). Do not modify CRA internals directly.

## Project-specific conventions & patterns

- Aliases and webpack customizations live in `config-overrides.js` and are enabled via `react-app-rewired` + `react-app-rewire-aliases` — prefer adding imports using the alias convention rather than relative deep paths.
- Code structure uses feature/area grouping under `src/views/` (e.g., `src/views/threed/`), reusable UI pieces under `src/@core/components/`, and shared utilities under `src/utility/`.
- Mock/demo data lives in `src/@fake-db/` — use it for local UI-only testing; real backend integration is likely handled in `src/context/controller/` and `src/auth/`.
- Auth: JWT handling is implemented in `src/auth/useJwt.js` and permission definitions are in `src/configs/acl/` (CASL). When working on auth or permissions, check these files first.
- Redux: store configuration and reducers are under `src/redux/` (see `storeConfig/` and `reducers/`) — dispatch patterns follow standard `redux` + `redux-thunk`.
- Routing: router setup uses `react-router-dom` v5. Check `src/router/Router.js` and `src/router/routes/` for route definitions and guards.

## Integration points & external assets

- Static/third-party assets that must be shipped with the app live in `public/` (e.g., `public/darco/*`, `public/js/*`, `public/MainCSS/archivestyle.css`). Put new runtime assets in `public/`.
- The `build/` folder is included in repo snapshots and contains built assets and `asset-manifest.json`; avoid editing build outputs manually.
- 3D/visualization helpers live in `public/darco/` and `public/js/` and are consumed by `src/views/threed/*` (example: `ThreedComponent/ImgGrid.jsx`). If adding or upgrading WebAssembly/decoder files, place them under `public/` and update import/runtime loader paths accordingly.

## Quick code patterns & examples

- Adding a route: update `src/router/routes/*` and `src/router/Router.js` (follow existing route metadata pattern). Routes may include ACL checks — see `src/configs/acl/ability.js`.
- Using mocks: import from `src/@fake-db/mock.js` to simulate backend responses on UI-only pages.
- Redux action/reducer convention: actions live under `src/redux/actions/` and reducers under `src/redux/reducers/` — use `redux-thunk` async patterns when interacting with APIs.

## File-level pointers (start here for most tasks)

- App entry: `src/index.js` and `src/App.js` — app-level providers (Redux, Router, Theme) are wired here.
- Routing & guards: `src/router/Router.js` and `src/router/routes/`.
- Styling: project uses SASS; variables and central styles are under `src/assets/scss/` and `src/@core/scss/` and `customStyles/`/`public/MainCSS/`.
- Auth & permissions: `src/auth/useJwt.js`, `src/configs/acl/ability.js`.
- Webpack overrides & aliases: `config-overrides.js`.

## Do / Don't (concrete)

- Do: Use `npm start` for dev, edit `src/` files, add static assets to `public/`.
- Do: Use `config-overrides.js` to add build-time aliases/loaders.
- Don't: Commit edited files inside `build/` as source; they are build artifacts.
- Don't: Assume `react-scripts` default config — this project uses `react-app-rewired`.

## How to ask for more context

- If you need backend endpoints, search `src/context/controller/` and `utility/Utils.js` for where API calls are defined.
- If a 3D asset fails to load, check `public/darco/` and `public/js/` loaders and confirm paths used by `src/views/threed/` components.

---
If anything is missing or a section should call out other files, tell me which area to expand (build, routing, auth, threed assets, or aliases) and I will iterate.
