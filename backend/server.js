import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// This is your clean, correct backend route for user signup.
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // FIX: Using db.query, which we determined works better for simple inserts.
    const [result] = await db.query( 
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    res.json({ message: 'User registered successfully! You can now log in.' });
  } catch (err) {
    console.error('Database Error:', err);
    
    // Improved error handling for common MySQL errors
    if (err.code === 'ER_DUP_ENTRY') {
      // 409 Conflict status for duplicate resources
      return res.status(409).json({ message: 'Error: This email is already registered.' });
    }
    
    res.status(500).json({ message: 'Error registering user due to a server issue.' });
  }
});

app.listen(5001, () => {
  console.log('🚀 Server running on http://localhost:5001');
});
