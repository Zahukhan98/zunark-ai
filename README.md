# zunark-ai

Public website + internal AI-assisted operations dashboard for zunark-ai.com.

Stack: Next.js (App Router, TypeScript, Tailwind) · PostgreSQL + Prisma · Auth.js (Credentials) · Anthropic Claude API.

## Local setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   Fill in `ANTHROPIC_API_KEY` and generate an `AUTH_SECRET`:
   ```bash
   npx auth secret
   ```
   Set the three `SEED_*_PASSWORD` values to temporary passwords for the initial accounts.

3. **Start local Postgres** (Docker Desktop must be running)
   ```bash
   npm run db:up
   ```

4. **Apply the schema and seed initial users**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
   This creates three accounts:
   - `zahid@zunark-ai.com` — Super Admin (Mohammed Zahid Khan)
   - `kamar@zunark-ai.com` — Admin (Mohammed Kamar)
   - `dev@zunark-ai.com` — Developer

5. **Run the app**
   ```bash
   npm run dev
   ```
   - Public site: http://localhost:3000
   - Dashboard: http://localhost:3000/dashboard (redirects to `/login`)

## Other commands

- `npm run db:studio` — browse the database with Prisma Studio
- `npm run db:down` — stop the local Postgres container

## Project structure

```
app/(public routes)        home, services, contact — full marketing site in Milestone 2
app/dashboard/             authenticated internal platform, gated by middleware.ts
app/api/auth/              Auth.js route handler
lib/auth.ts                Auth.js config (Credentials provider, JWT sessions)
lib/permissions.ts         role → permission map, checked server-side everywhere
lib/db.ts                  Prisma client singleton
prisma/schema.prisma       full data model (users, clients, projects, AI, billing, ...)
prisma/seed.ts             creates the 3 initial accounts from env vars
```

## Security notes

- `ANTHROPIC_API_KEY` is read only in server-side code (`lib/`, route handlers, server actions) — never imported into a client component.
- Passwords are bcrypt-hashed; nothing is ever stored in plaintext.
- Every server action re-checks the session and role itself — page-level gating is not treated as sufficient authorization.
- `.env.local` is gitignored; only `.env.example` (no real secrets) is committed.

## Environments

Local → Staging → Production, each with its own database and its own `.env`. Nothing here talks to production infrastructure — see the architecture doc from the planning phase for the migration path.
