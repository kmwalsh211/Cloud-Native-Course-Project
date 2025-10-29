const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./greenhouse.db");

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS adopted_plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plant_id INTEGER NOT NULL,
      nickname TEXT,
      adopted_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
