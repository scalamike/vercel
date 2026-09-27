# Little Paws

A small cat adoption catalog built with Next.js and Supabase.

## Local development

```bash
npm install
npm run db:start
npm run dev
```

Set `DATABASE_URL` in `.env.local` to your PostgreSQL connection string before opening http://localhost:3000. If using the local Supabase development stack, `db:start` prints its PostgreSQL connection URL; use that database URL rather than the HTTP API URL.

Reset the local database to replay migrations and seeds:

```bash
npm run db:reset
```

## Server PostgreSQL

The app queries PostgreSQL directly using `pg`. Configure a server-only runtime environment variable (for example, through your host's `app.yaml` environment settings):

```env
DATABASE_URL=postgresql://app_user:password@database-host:5432/database_name
```

The database must already contain `public.cats` with the columns defined in `supabase/migrations/20260926000000_create_cats.sql`. The database user needs schema access and SELECT permission. If you imported Supabase row-level security policies, ensure they allow your application role to read available cats; the original policy targets only `anon` and `authenticated`.

The Supabase API environment variables are no longer used. Missing configuration or failed queries now raise errors instead of displaying sample data. Configure TLS according to your database provider's requirements in the connection settings.

First install the PostgreSQL dependencies and keep the resulting `package.json` and lockfile changes:

```bash
npm install pg server-only
npm install -D @types/pg
```

For subsequent deployments, install dependencies, build, and restart your application's service:

```bash
npm ci
npm run build
npm run start
```

The database is accessed at request time, not during the build. Database migrations remain separate from application builds; the existing `db:*` scripts are for the optional Supabase development tooling.

## Checks

```bash
npm run lint
npm run build
```
