import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Eigene Module importieren
import db from './db/database.js'; 
import * as helper from './helper.js'; // Importiert alle Funktionen aus helper.js

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const HTTP_PORT = 8000;

app.use(express.json());
// app.use(exoress.static) darf hier nicht sein - Bugfix.

// +++ API ROUTEN +++

// 1. Kategorien abrufen
app.get('/api/categories', (req, res) => {
    const rows = db.prepare('SELECT * FROM kategorien ORDER BY name ASC').all();
    res.json(rows);
});

// 2. Transaktion speichern (mit Helper-Nutzung!)
app.post('/api/transactions', (req, res) => {
    try {
        const { tr_id, einnahme, betrag, kategorie_id, datum, beschreibung } = req.body;

        // --- Validierung mit helper.js ---
        if (!helper.isNumeric(betrag)) {
            return res.status(400).json({ success: false, error: "Betrag muss eine Zahl sein." });
        }

        // Optional: Datum prüfen (falls String leer ist, nimm "Jetzt")
        let finalDate = datum;
        if (helper.isUndefined(datum) || datum === '') {
             // Nutzt Luxon aus deinem Helper, um das aktuelle Datum als SQL-String zu holen
             // Hinweis: Du müsstest ggf. formatToSQLDate(helper.getNow()) nutzen
             finalDate = new Date().toISOString().split('T')[0]; 
        }

        // Speichern
        const stmt = db.prepare(`
            INSERT INTO transaktionen (tr_id, einnahme, betrag, datum, kategorie_id, beschreibung)
            VALUES (@tr_id, @einnahme, @betrag, @datum, @kategorie_id, @beschreibung)
        `);

        // Wir nutzen helper.round, um sicherzustellen, dass wir nur 2 Nachkommastellen speichern
        const info = stmt.run({
            einnahme: true, 
            betrag: helper.round(betrag), 
            datum: finalDate, 
            kategorie_id, 
            beschreibung 
        });

        res.status(201).json({ success: true, id: info.lastInsertRowid });

    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: e.message });
    }
});

// Debug Routes:
// Get table gibt die komplette transactions Tabelle zurück.
// Gut für curl Debugging: curl http://localhost:8000/api/getTable bzw resetTable
app.get('/api/getTable', (req, res) => {
    const category = db.prepare("SELECT * FROM transaktionen").all();
    res.json(category);
});

// Hier kriegt man die ganze Tabelle als Dictionary zurück.
// Wird verwendet um in main.js die transactions Variable zu initialisieren.
app.get('/api/getTableArray', (req, res) => {
    const query = `
        SELECT 
            t.tr_id,
            t.einnahme,
            t.betrag,
            t.datum,
            t.beschreibung,
            t.notizen,
            k.name AS kategorie
        FROM transaktionen t
        LEFT JOIN kategorien k 
            ON t.kategorie_id = k.kategorie_id
    `;

    const rows = db.prepare(query).all();

    const result = rows.map(row => ({
        id: row.tr_id,
        einnahme: row.einnahme === "true",
        betrag: row.betrag,
        datum: row.datum,
        kategorie: row.kategorie,
        beschreibung: row.beschreibung,
        notizen: row.notizen ?? ""
    }));

    res.json(result);
});

// TODO: Sollte ab hier alles POST sein, aber geht noch nicht.
app.get('/api/resetTable', (req, res) => {
    const category = db.prepare("DELETE FROM transaktionen").run();
    res.json(category);
});

// Das hier ist das eigentliche write, mit dem ich bei New Entry
// Werte dynamisch in die Datenbank schreibe.
// TODO: Hier fehlt noch die Validierung wie oben bei
// app.post('/api/transactions' -> habe es damit nicht hingekriegt und dafür die Route hier geschrieben.
app.post('/api/write', (req, res) => {
    const { einnahme, betrag, datum, kategorie, beschreibung } = req.body;

    const kategorieRow = db.prepare("SELECT kategorie_id FROM kategorien WHERE name = ?").get(kategorie);
    /*if (!catRow) {
        return res.status(400).json({ success: false, error: "Kategorie existiert nicht" });
    }*/
    const kategorie_id = kategorieRow.kategorie_id;

    const stmt = db.prepare(`
        INSERT INTO transaktionen (einnahme, betrag, datum, kategorie_id, beschreibung)
        VALUES (@einnahme, @betrag, @datum, @kategorie_id, @beschreibung)
    `);

    const info = stmt.run({
        // TODO: tr_id: // Das hier braucht man glaub nicht da die IDs in der Datenbank eigenständig gemacht werden?
        einnahme,
        betrag,
        datum,
        kategorie_id,
        beschreibung
    });

    res.json({ success: true, id: info.lastInsertRowid });
});


//----------------------------------------------------------------------------------------------------------------------------
//Test neuer write
//----------------------------------------------------------------------------------
import TransactionDao from "./dao/transacions_dao.js";
const transactionDao = new TransactionDao(db);

app.post('/api/write1', (req, res) => {
    // 1. Daten aus dem Body holen
    const { einnahme, betrag, datum, kategorie, beschreibung, notizen } = req.body;

    try {
        // 2. Kategorie-ID ermitteln (Logik aus deinem alten Code übernommen)
        // Das ist wichtig, weil die TransaktionDao eine ID erwartet, keinen Namen.
        const kategorieRow = db.prepare("SELECT kategorie_id FROM kategorien WHERE name = ?").get(kategorie);
        
        // Kleiner Check, falls Kategorie nicht gefunden wird (optional aber empfohlen)
        if (!kategorieRow) {
             return res.status(400).json({ success: false, error: `Kategorie '${kategorie}' nicht gefunden.` });
        }

        // 3. Objekt für die DAO vorbereiten
        const neueTransaktion = {
            einnahme: einnahme, // muss 'true' oder 'false' sein (String)
            betrag: betrag,
            datum: datum,
            kategorie_id: kategorieRow.kategorie_id, // Hier die ID übergeben!
            beschreibung: beschreibung,
            notizen: notizen
        };
        // 4. DAO aufrufen (Das ist der neue Teil!)
        // Die DAO kümmert sich jetzt um das SQL INSERT und formatting
        const erstellterEintrag = transactionDao.create(neueTransaktion);

        // 5. Erfolg zurückmelden
        // Wir senden den kompletten neuen Eintrag zurück (inkl. der neuen ID)
        res.status(200).json({ 
            success: true, 
            data: erstellterEintrag 
        });

    } catch (error) {
        console.error("Fehler beim Erstellen:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Das hier ist ein write, um immer die gleichen Werte manuell über curl an die Datenbank zu senden
// für Debuggingzwecke.
// Dazu könnt ihr curl http://localhost:8000/api/writeTest verwenden.
app.post('/api/writeTest', (req, res) => {
    // Speichern
    const stmt = db.prepare(`
        INSERT INTO transaktionen (einnahme, betrag, datum, kategorie_id, beschreibung)
        VALUES (@einnahme, @betrag, @datum, @kategorie_id, @beschreibung)
    `);

    // Wir nutzen helper.round, um sicherzustellen, dass wir nur 2 Nachkommastellen speichern
    const info = stmt.run({
    // TODO: tr_id: 
    einnahme: "false",
    betrag: "285.00",
    datum: "2025-09-02",
    kategorie_id: 9,           // must be an ID, not a name
    beschreibung: "Gehalt September"
    });

    res.status(201).json({ success: true, id: info.lastInsertRowid });
});

// Händige alles im Frontend Ordner als File aus.
// (Muss hier am Ende stehen).
app.use(express.static(path.join(__dirname, '../Frontend')));

// +++ FRONTEND ROUTE +++
// Sobald die Hauptseite aufgerufen wird, wird dem Benutzer die index.html zugeschickt.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.listen(HTTP_PORT, () => console.log(`Server läuft auf http://localhost:${HTTP_PORT}`));