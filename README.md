# Little Paws

A small cat adoption catalog built with Next.js and PostgreSQL. This project is used to test application and database migrations away from Vercel and Supabase.

## Configuration

The app connects directly to PostgreSQL using `pg`. Set the server-only `DATABASE_URL` environment variable to your database connection string:

```env
DATABASE_URL=postgresql://app_user:password@database-host:5432/database_name
```

The database must contain the `public.cats` table, and the application user must have permission to read it. Configure TLS according to your database provider's requirements.

The app queries the database at request time. Missing configuration or failed queries raise errors rather than displaying sample data.

## Run locally

Set `DATABASE_URL` in `.env.local`, then run:

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Build and run

Set `DATABASE_URL` in the hosting environment, then run:

```bash
npm ci
npm run build
npm run start
```

## Checks

```bash
npm run lint
npm run build
```
