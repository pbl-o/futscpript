import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true,
});

export const getDataConnection = async () => {
  const { rows } = await pool.query("SELECT NOW()");
  if (!rows || rows.length === 0) {
    console.log(error);
  }
  console.log(`Database connected at ${rows[0].now}`);
};
