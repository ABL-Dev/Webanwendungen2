import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const DB_NAME = "webanw2.db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, DB_NAME);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Fehler beim Verbinden mit der Datenbank:", err.message);
  } else {
    console.log("Erfolgreich mit der SQLite-Datenbank verbunden.");
  }
});

export { db };