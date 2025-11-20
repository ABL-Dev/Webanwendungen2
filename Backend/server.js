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
app.use(express.static(path.join(__dirname, '../Frontend')));

// +++ API ROUTEN +++

// 1. Kategorien abrufen
app.get('/api/categories', (req, res) => {
    const rows = db.prepare('SELECT * FROM categories ORDER BY name ASC').all();
    res.json(rows);
});

// 2. Transaktion speichern (mit Helper-Nutzung!)
app.post('/api/transactions', (req, res) => {
    try {
        const { type, amount_eur, category_id, date, description } = req.body;

        // --- Validierung mit helper.js ---
        if (!helper.isNumeric(amount_eur)) {
            return res.status(400).json({ success: false, error: "Betrag muss eine Zahl sein." });
        }

        // Optional: Datum prüfen (falls String leer ist, nimm "Jetzt")
        let finalDate = date;
        if (helper.isUndefined(date) || date === '') {
             // Nutzt Luxon aus deinem Helper, um das aktuelle Datum als SQL-String zu holen
             // Hinweis: Du müsstest ggf. formatToSQLDate(helper.getNow()) nutzen
             finalDate = new Date().toISOString().split('T')[0]; 
        }

        // Speichern
        const stmt = db.prepare(`
            INSERT INTO transactions (type, amount_eur, date, category_id, description)
            VALUES (@type, @amount_eur, @date, @category_id, @description)
        `);

        // Wir nutzen helper.round, um sicherzustellen, dass wir nur 2 Nachkommastellen speichern
        const info = stmt.run({ 
            type, 
            amount_eur: helper.round(amount_eur), 
            date: finalDate, 
            category_id, 
            description 
        });

        res.status(201).json({ success: true, id: info.lastInsertRowid });

    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: e.message });
    }
});

// +++ FRONTEND ROUTE +++
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.listen(HTTP_PORT, () => console.log(`Server läuft auf http://localhost:${HTTP_PORT}`));