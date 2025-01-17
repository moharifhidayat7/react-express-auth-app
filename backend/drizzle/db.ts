import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({
	connectionString: process.env.DATABASE_URL + process.env.DATABASE_NAME!,
});

const db = drizzle({ client: pool });

export { db };
