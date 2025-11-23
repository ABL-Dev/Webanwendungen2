import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Eigene Module importieren
import db from './db/database.js'; 
import * as helper from './helper.js'; // Importiert alle Funktionen aus helper.js


//routen importiren
import transactionRouter from './services/transacion.js';

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

//Trasnsaktion service aufrufen (Aktuell nur für new Entry)
const TOPLEVELPATH = '/api';
app.locals.db = db

app.use(TOPLEVELPATH, transactionRouter);


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