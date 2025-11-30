-- kategorien und transaktionen umbenannt.
CREATE TABLE IF NOT EXISTS kategorien(
    kategorie_id     INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transaktionen(
    tr_id INTEGER PRIMARY KEY AUTOINCREMENT,
    einnahme            TEXT CHECK(einnahme IN('true', 'false')) NOT NULL,
    betrag      REAL NOT NULL,
    datum            DATE NOT NULL,
    kategorie_id     INTEGER,
    beschreibung     TEXT,
    notizen            TEXT,
    FOREIGN KEY (kategorie_id) REFERENCES kategorien(kategorie_id)
);

CREATE TABLE IF NOT EXISTS todos(
    todo_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    note            TEXT NOT NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_done         BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS einstellung_slots(
    slot_id         INTEGER PRIMARY KEY,
    kategorie_id    INTEGER,
    budget          REAL,

    FOREIGN KEY (kategorie_id) REFERENCES kategorien(kategorie_id) ON DELETE SET NULL,

    CHECK (slot_id BETWEEN 1 AND 5)
);