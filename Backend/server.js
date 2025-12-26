import express from 'express';

// Eigene Module importieren
import db from './db/database.js'; 

import cors from 'cors';


//routen importiren
import transactionRouter from './services/transacion.js';
import todoRouter from "./services/todo.js";
import settingsRouter from './services/settings.js';

const app = express();
const HTTP_PORT = 8000;

app.use(express.json());
app.use(cors());

// +++ API ROUTEN +++

//Trasnsaktion service aufrufen (Aktuell nur für new Entry)
const TOPLEVELPATH = '/api';
app.locals.db = db

app.use(TOPLEVELPATH, transactionRouter);
app.use(TOPLEVELPATH, todoRouter);
app.use(TOPLEVELPATH, settingsRouter);

app.listen(HTTP_PORT, () => console.log(`Server läuft auf http://localhost:${HTTP_PORT}`));