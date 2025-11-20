import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


//Damit wir relative PFade zu dieser DAtei finden können
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Pfad zur Datenbak
const dbFile = path.join(__dirname, "webanw2.sqlite");
const sqlFile = path.join(__dirname, "Create Tabels.sql");

//Erstellt die DB
const db = new Database(dbFile, {verbose: console.lod});
db.pragma('foreign_keys = ON');

// Tabelle aus der SQL-Datei erstellen
const tabelExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='transactions'").get();

if (!tabelExists) {
    try {
        if (fs.existsSync(sqlFile)) {
            const sqlContent = fs.readFileSync(sqlFile, "utf8");
            console.log("Tabellen wurden aus 'Create Tabels.sql' erstellt.");
        }else{
            console.log(`FEHLER: Die Datei ${sqlFile} wurde nicht gefunden!`);
        }
    }catch(err){
        console.log("FEHLER beim Ausführen des SQL-Skripts:", err);
    }
}