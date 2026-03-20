import mysql from "mysql2/promise"; // <--- CHANGED: Import 'mysql2/promise'
import dotenv from "dotenv";
dotenv.config();

// Since we are using the promise version, we create the connection and export the promise pool
const db = mysql.createPool({ // <--- CHANGED: Create a Pool instead of a single Connection (better practice)
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Note: No need for an explicit db.connect() call here, the pool handles connections.
console.log("✅ MySQL promise pool initialized!");

export default db;
