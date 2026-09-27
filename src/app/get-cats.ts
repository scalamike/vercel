import "server-only";
import { Pool } from "pg";
import { connection } from "next/server";
import type { Cat } from "./cats";

const globalForDatabase = globalThis as typeof globalThis & {
  catsPool?: Pool;
};

function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL must be set to load cats from PostgreSQL.");
  }

  if (!globalForDatabase.catsPool) {
    const pool = new Pool({
      connectionString,
      max: 5,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
    });
    pool.on("error", () => {
      console.error("An idle PostgreSQL connection failed.");
    });
    globalForDatabase.catsPool = pool;
  }

  return globalForDatabase.catsPool;
}

export async function getCats(): Promise<Cat[]> {
  await connection();

  const { rows } = await getPool().query<Cat>(`
    SELECT id, name, breed, age, gender, location, image,
           description, traits, featured
    FROM public.cats
    WHERE available = true
    ORDER BY featured DESC, name ASC
  `);

  return rows;
}
