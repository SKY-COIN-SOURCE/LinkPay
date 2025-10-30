-- Users
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  ref_code TEXT UNIQUE NOT NULL,
  referred_by TEXT,
  ref_earnings REAL DEFAULT 0
);

-- Links
CREATE TABLE IF NOT EXISTS links (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  target TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  earnings REAL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_links_owner ON links(owner_email);
CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);