import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Eigene Module importieren
import db from './db/database.js'; 
import * as helper from './helper.js'; // Importiert alle Funktionen aus helper.js


//routen importiren
import transactionRouter from './services/transacion.js';
import todoRouter from "./services/todo.js";
import settingsRouter from './services/settings.js';

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

//Trasnsaktion service aufrufen (Aktuell nur für new Entry)
const TOPLEVELPATH = '/api';
app.locals.db = db

app.use(TOPLEVELPATH, transactionRouter);
app.use(TOPLEVELPATH, todoRouter);
app.use(TOPLEVELPATH, settingsRouter);

// Händige alles im Frontend Ordner als File aus.
// (Muss hier am Ende stehen).
app.use(express.static(path.join(__dirname, '../Frontend')));

// +++ FRONTEND ROUTE +++
// Sobald die Hauptseite aufgerufen wird, wird dem Benutzer die index.html zugeschickt.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.listen(HTTP_PORT, () => console.log(`Server läuft auf http://localhost:${HTTP_PORT}`));