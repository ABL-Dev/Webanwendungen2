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

try {
    if (fs.existsSync(sqlFile)) {
        const sqlContent = fs.readFileSync(sqlFile, "utf8");
        db.exec(sqlContent);
        console.log("Tabellen wurden aus 'Create Tabels.sql' erstellt.");
    }else{
        console.log(`FEHLER: Die Datei ${sqlFile} wurde nicht gefunden!`);
    }
}catch(err){
    console.log("FEHLER beim Ausführen des SQL-Skripts:", err);
}

// Standart-Kategorien Befüllen
try {
    const catCount = db.prepare('SELECT count(*) as count FROM kategorien').get().count;

    if (catCount === 0) {
        console.log("[DB] Keine Kategorien gefunden. Führe Seeding-Skript aus...");
        
        const seedSqlFile = path.join(__dirname, "Instert.sql");

        if (fs.existsSync(seedSqlFile)) {
            // Die gesamte SQL-Datei einlesen
            const seedSql = fs.readFileSync(seedSqlFile, "utf8");
            
            // Alles in einer Transaktion ausführen
            db.exec(seedSql); 
            console.log("[DB] Standard-Kategorien aus Insert.sql eingefügt.");
        } else {
            console.error(`[DB ERROR] Die Seeding-Datei ${seedSqlFile} wurde NICHT gefunden.`);
        }
    } else {
        console.log(`[DB] Es existieren bereits ${catCount} Kategorien.`);
    }

} catch (error) {
    console.error("[DB ERROR] Fehler beim Seeding der Kategorien:", error);
}

export default db;