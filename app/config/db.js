// db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to query the database
export const query = async (sql, values) => {
  const [results] = await pool.execute(sql, values);
  return results;
};

// Function to close the connection pool (optional)
export const close = async () => {
  await pool.end();
};
