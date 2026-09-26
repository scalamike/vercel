# Little Paws

A small cat adoption catalog built with Next.js and Supabase.

## Local development

```bash
npm install
npm run db:start
npm run dev
```

Open http://localhost:3000. Supabase starts at http://127.0.0.1:54321; local API credentials are printed by `db:start` and the publishable key is stored in the ignored `.env.local`.

Reset the local database to replay migrations and seeds:

```bash
npm run db:reset
```

## Remote Supabase

Create a Supabase project, then authenticate and link it:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npm run db:push
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the Vercel project for Development, Preview, and Production. The app reads available cats on each request when configured; otherwise it uses the sample data in `src/app/cats.ts`.

Run `npm run db:push` after linking to apply committed migrations to the remote database. Database migrations are intentionally separate from Vercel builds.

## Checks

```bash
npm run lint
npm run build
```
