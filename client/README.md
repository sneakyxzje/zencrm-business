# ZenCRM — FSD Hybrid Refactor

A React + Vite + TypeScript CRM front-end, restructured using a **Feature-Sliced Design (FSD) hybrid** to improve scalability, discoverability, and developer velocity — while preserving existing business logic.

---

## ✨ Highlights

- **FSD Hybrid Layout**: clear boundaries between `entities` (API), `features` (UI logic), `widgets` (reusable UI), `pages` (glue), and `shared` (utils).
- **Path Aliases**: no more `../../../`; use `@entities/*`, `@features/*`, `@widgets/*`, etc.
- **Type-safe API**: entities define models and API calls with strict types.
- **Same behavior**: endpoints & UI flows are unchanged.

---

## 🧱 Tech Stack

- **React 18**, **Vite**, **TypeScript**
- **Redux Toolkit** (auth slice/hooks)
- **TailwindCSS**, **Framer Motion**
- **ESLint** (flat config) + TypeScript rules
- _(Optional)_ **vite-plugin-svgr** for SVG components

---

🚀 Getting Started

# install

npm i

# dev

npm run dev

# type check

npm run type-check

# lint

npm run lint
Ensure your .env (if any) is placed according to Vite conventions (e.g., .env.local).

🔌 Axios Setup
@shared/api/axios.ts centralizes axios instance (baseURL, interceptors, credentials config).
All entity APIs import from there.

🧩 Icons Pattern (Sidebar)
Menu stores keys (e.g., "home", "announcement").

Sidebar renders <Icon name="home" /> mapped by a registry:

widgets/sidebar/ui/icons/
├─ HomeIcon.tsx
├─ AnnouncementIcon.tsx
├─ ...
├─ key.ts # export type IconKey = ...
└─ index.tsx # const ICONS = { home: HomeIcon, ... }
This keeps menus lightweight and icons swappable.

🧪 Scope of Refactor
✅ No business changes: endpoints and payloads preserved.

✅ UI structure and flows remain the same.

🔁 Imports migrated to aliases; ESLint/import-order applied.

🧭 Conventions
Entities: models + API. Zero UI.

Features: a small use case (hook + UI). Can depend on entities/shared.

Widgets: reusable presentational blocks (no business logic).

Pages: compose features/widgets; no API calls directly.

Shared: utils, base UI, cross-cutting libs.

🛠 Scripts
dev — Start Vite dev server

build — Build for production

preview — Preview production build

lint — ESLint

type-check — TypeScript project check

```

```
