<!--
Purpose: Short, actionable guidance for AI coding agents working in this repo.
Keep this file ~20-50 lines. Reference concrete files and patterns found in the codebase.
-->

# Copilot Instructions

**Repo Overview:** This is a Vite + React (client-side) e-commerce UI using Tailwind CSS and Firebase. Key entry points: `src/main.jsx` (app bootstrap) and `src/App.jsx` (routes). UI components live in `src/components`; pages are in `src/pages`.

**Build & Dev:**
- **Dev server:** `npm run dev` (Vite). Default port is the Vite port (e.g. http://localhost:5173).
- **Build:** `npm run build` and check with `npm run preview`.
- **Lint:** `npm run lint` (ESLint configured in repo).

**Routing:** Use `react-router-dom`. Routes are declared in `src/App.jsx`. Add new pages under `src/pages` and register routes in `App.jsx` (example: `/products` and `/products/:id`).

**Data & API patterns:**
- External data is fetched through `src/services/api.js` which uses `axios` and a shared `BASE` constant pointing to `https://dummyjson.com/products`.
- Functions follow a pattern: `async` call, `try/catch`, `console.error` on failure and return an empty array or fallback. When adding new API functions, match this pattern (return stable defaults on error).

**Firebase:**
- Firebase is initialized in `src/firebase/config.js` and exported as `app`. Other Firebase interactions are expected under `src/firebase` (e.g., `firestore.js`). If changing credentials, use Vite env vars with `VITE_` prefix and do not commit secrets.

**Component & styling conventions:**
- Components are colocated in `src/components`. Some components have companion CSS files (e.g., `Carousel.jsx` + `Carousel.css`). Follow the existing pattern: small focused components, and CSS files where used.
- UI subfolders: `components/buttons`, `components/forms` contain reusable primitives. Prefer these for new shared UI elements.

**State & Context:**
- Look in `src/context` for app-level providers. If you need global state, add a provider there and wrap in `src/main.jsx` or `App.jsx` as appropriate.

**Where to change behavior:**
- Routes: `src/App.jsx`.
- Data layer: `src/services/api.js` (external HTTP) and `src/firebase/*` (Firebase-backed data or auth).
- Page layout and composition: `src/pages/*` and `src/components/*`.

**Examples:**
- Add a route: create `src/pages/MyNewPage.jsx` and add `<Route path="/my-new" element={<MyNewPage />} />` to `src/App.jsx`.
- Add API call: follow `getProductById` in `src/services/api.js` — `async function`, `try/catch`, return parsed data or fallback.

**Tests & CI:** No tests or CI config detected. Keep changes minimal and runnable locally using the dev server.

**Small gotchas:**
- The project uses Tailwind + PostCSS; run the dev server to verify CSS changes.
- Firebase config is hard-coded in `src/firebase/config.js`; prefer `VITE_` env vars for new keys.

If anything here is unclear or you want more detail in a specific section (routes, firebase, or API patterns), tell me which area to expand.
