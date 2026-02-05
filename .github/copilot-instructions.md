## Purpose
Short, actionable guidance for AI coding agents working on this repository.

### Quick Start (commands)
- Dev: `npm run dev` (Next.js app router in `src/app`).
- Build: `npm run build` then `npm run start` for production.
- Lint: `npm run lint` (uses `eslint`).

### Big-picture architecture
- Framework: Next.js (App Router, server components by default). See [src/app/layout.tsx](src/app/layout.tsx#L1-L60) for how locale and providers are wired.
- UI: React + Tailwind + some SCSS modules (e.g., `src/app/home/style/home.module.scss`).
- i18n: `next-intl` with JSON message files in the repository root `messages/` (e.g., [messages/en.json](messages/en.json)). Server-side locale resolution uses `getLocale()`/`getMessages()` in `layout.tsx`.
- Server integrations: Firebase Admin and Supabase server client live in `src/lib` — see [src/lib/firebase.ts](src/lib/firebase.ts#L1-L40) and [src/lib/supabaseServer.ts](src/lib/supabaseServer.ts#L1-L40).
- API routes: App-specific API endpoints live under `src/api` (example: `src/api/newyear/route.ts`).

### Key patterns & conventions (project-specific)
- App Router + Server Components: Files inside `src/app` are server components by default. Convert to a client component by using a `*.client.tsx` suffix when the component uses browser-only APIs or hooks. Example: `src/app/home/upcoming-events/MobileEventsSlider.client.tsx`.
- Provider pattern: Global providers (intl, menu) are initialized in `src/app/layout.tsx` using `NextIntlClientProvider` and `MenuProvider`.
- Path aliases: `@/` maps to `src/` — use these consistently when importing internal modules (see imports in `layout.tsx`).
- Styles: Tailwind is primary; component-level styles occasionally use SCSS modules (look for `.module.scss` files).
- Naming: Some components use lowercase filenames (e.g., `header.tsx`) — follow existing file naming when adding new components.

### Environment & secrets (important)
- `FIREBASE_ADMIN_KEY` — expected to be a JSON string (parsed in `src/lib/firebase.ts`).
- `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` — Supabase server client uses the service role key (see `src/lib/supabaseServer.ts`).
- Email/notifications: project uses `nodemailer`, `resend` and `telegraf` in dependencies — check `src/lib` and `src/api` for concrete usage and required env vars.

### Integration notes (do not break)
- Firebase Admin initialization runs only on the server and reads a JSON service account from env (do not attempt to run that in the browser). See [src/lib/firebase.ts](src/lib/firebase.ts#L1-L20).
- Supabase server client is created with `auth.persistSession: false` — server-side use only.
- Translation messages are loaded server-side and provided to the client using `NextIntlClientProvider`. When adding translations, update `messages/*.json`.

### Example tasks and pointers
- To add a new API endpoint: add a route under `src/api/*/route.ts` and keep server-only secrets in env.
- To add a localized page: add content under `src/app` and update `/messages/<locale>.json`.
- To make a component interactive, create a `*.client.tsx` component and import it into the server component.

### Files to inspect first when troubleshooting
- [src/app/layout.tsx](src/app/layout.tsx#L1-L60) — boots providers and i18n.
- [src/lib/firebase.ts](src/lib/firebase.ts#L1-L40) — Firestore & storage initialization.
- [src/lib/supabaseServer.ts](src/lib/supabaseServer.ts#L1-L40) — Supabase server client.
- [i18n/config.ts](i18n/config.ts#L1-L40) — locales list and defaults.
- [messages/](messages/) — current translation JSON files.

### Safety & limits for AI edits
- Avoid committing secrets or replacing server-only code with client-side equivalents.
- Keep changes minimal and follow the file naming conventions (`.client.tsx` for client components).

If anything here is unclear or if you want more examples (tests, CI, or common PR patterns), tell me which area to expand.
