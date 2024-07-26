import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Export the query function
export const query = (text: string, params?: any[]) => pool.query(text, params);
export default pool;
