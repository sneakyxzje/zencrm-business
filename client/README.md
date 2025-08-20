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

## 📁 Folder Structure (FSD Hybrid)

src/
├─ app/ # App bootstrap, providers, store hooks, global styles
├─ routes/ # Top-level route composition (if needed)
├─ processes/ # Cross-cutting flows (e.g., auth state/guards)
│ └─ auth/
│ └─ models/ # useAuth, guards
├─ pages/ # Page-level composition (glue only)
│ └─ marketing/
│ └─ upload/ # MarketingUploadPage (uses feature + widgets)
├─ widgets/ # Reusable UI blocks (Sidebar, tables, headers…)
│ └─ sidebar/
│ ├─ model/ # menuByRole, types
│ └─ ui/ # Sidebar.tsx, icons/, Icon registry
├─ features/ # Slices of user scenarios (hooks + UI)
│ └─ lead-upload/
│ ├─ model/ # useLeadUpload hook
│ └─ ui/ # LeadUploadForm.tsx
├─ entities/ # Business entities (API + models)
│ └─ lead/
│ ├─ api.ts # uploadLead, list, assign…
│ └─ model/
│ └─ types.ts # Lead, Page, UploadRequest…
└─ shared/ # Shared foundation: libs, api, assets, ui primitives
├─ api/axios.ts
├─ lib/time.ts
└─ ui/...

pgsql
Copy
Edit

---

## 🧭 Path Aliases

```json
// tsconfig.json (excerpt)
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@app/*": ["app/*"],
      "@routes/*": ["routes/*"],
      "@processes/*": ["processes/*"],
      "@pages/*": ["pages/*"],
      "@widgets/*": ["widgets/*"],
      "@features/*": ["features/*"],
      "@entities/*": ["entities/*"],
      "@shared/*": ["shared/*"]
    }
  }
}
ts
Copy
Edit
// vite.config.ts (excerpt)
resolve: {
  alias: {
    "@app": path.resolve(__dirname, "src/app"),
    "@routes": path.resolve(__dirname, "src/routes"),
    "@processes": path.resolve(__dirname, "src/processes"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@widgets": path.resolve(__dirname, "src/widgets"),
    "@features": path.resolve(__dirname, "src/features"),
    "@entities": path.resolve(__dirname, "src/entities"),
    "@shared": path.resolve(__dirname, "src/shared"),
  },
},
ESLint flat config resolves TS paths for import rules.

🚀 Getting Started
bash
Copy
Edit
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

bash
Copy
Edit
widgets/sidebar/ui/icons/
├─ HomeIcon.tsx
├─ AnnouncementIcon.tsx
├─ ...
├─ key.ts         # export type IconKey = ...
└─ index.tsx      # const ICONS = { home: HomeIcon, ... }
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

(Confirm in package.json for exact names.)

🧯 Troubleshooting
Aliases not working in ESLint: check eslint.config.ts resolver and tsconfig paths.

SVG as React Components: ensure vite-plugin-svgr is installed & configured, or use inline SVG components.

“Cannot find module @…”: restart dev server after changing tsconfig/vite config.
```
