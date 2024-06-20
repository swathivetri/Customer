const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:'); 

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      account_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      app_secret_token TEXT NOT NULL,
      website TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL,
      url TEXT NOT NULL,
      http_method TEXT NOT NULL,
      headers TEXT NOT NULL,
      FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;
