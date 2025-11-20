CREATE TABLE IF NOT EXISTS categories(
    category_id     INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL,
    max_budget_eur  REAL
);

CREATE TABLE IF NOT EXISTS transactions(
    transactions_id INTEGER PRIMARY KEY AUTOINCREMENT,
    type            TEXT CHECK(type IN('income', 'expense')) NOT NULL,
    amount_eur      REAL NOT NULL,
    date            DATE NOT NULL,
    category_id     INTEGER,
    description     TEXT,
    nots            TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS todos(
    todo_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    note            TEXT NOT NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_done         BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS settings(
    key             TEXT PRIMARY KEY,
    value           TEXT
);