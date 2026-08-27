import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_POSTGRES_URL!);

let initialized = false;

export async function ensureSchema() {
  if (initialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      consent BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  initialized = true;
}

export { sql };
