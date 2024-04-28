const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Create a new SQLite database
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error creating database:', err);
  } else {
    console.log('Database created successfully');
    // Create a table to store user data
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)');
  }
});

// Middleware to parse request body
app.use(express.json());

// API endpoint to save user data
app.post('/api/users', (req, res) => {
  const { name, age } = req.body;
  const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
  db.run(sql, [name, age], (err) => {
    if (err) {
      console.error('Error saving user data:', err);
      res.status(500).json({ error: 'Failed to save user data' });
    } else {
      res.json({ message: 'User data saved successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});