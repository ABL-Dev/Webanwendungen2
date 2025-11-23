import TransactionDao from "../dao/transacions_dao.js";
import express from 'express';
var serviceRouter = express.Router();

//Neuen Eintrag erstellen
serviceRouter.post('/write', (req, res) => {
    //Db verbindung
    const db = req.app.locals.db;
    
    const transactionDao = new TransactionDao(db)

    // 1. Daten aus dem Body holen
    const { einnahme, betrag, datum, kategorie, beschreibung, notizen } = req.body;

    console.log(req.body);

    try {
        // Kategorie-ID ermitteln
        const kategorieRow = db.prepare("SELECT kategorie_id FROM kategorien WHERE name = ?").get(kategorie);
        
        // Kleiner Check, falls Kategorie nicht gefunden wird
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

        // DAO aufrufen
        // Die DAO kümmert sich jetzt um das SQL INSERT und formatting
        const erstellterEintrag = transactionDao.create(neueTransaktion);

        // Erfolg zurückmelden
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


serviceRouter.delete('/delete/:id', (req, res) =>{
    const db = req.app.locals.db;
    const transactionDao = new TransactionDao(db);

    const id = req.params.id;

    //URL String in Zahl ändern
    const idAsNumber = parseInt(id, 10);
    if (isNaN(idAsNumber)){
        return res.status(400).json({success: false, error: "Ungültige Transaktions-ID."});
    }
    try {
        transactionDao.delete(idAsNumber);

        res.status(204).end();
    }
    catch(error){
        console.log("Fehler beim Löschen:", error.message);

        if (error.message.includes("Kein Eintrag mit der ID")){
            return res.status(404).json({success: false, error: error.message});
        }
        res.status(500).json({success: false, error: "Interner Serverfehler beim Löschen."});
    }

});


//Daten beim edit Laden
serviceRouter.get('/load/:id', (req, res) =>{

    const db = req.app.locals.db;
    const transactionDao = new TransactionDao(db);

    const id = req.params.id;
    const idAsNumber = parseInt(id, 10);

    if (isNaN(idAsNumber)){
        return res.status(400).json({success: false, error: "Ungültige Transaktions-ID."});
    }

    try{
        const transaktion = transactionDao.loadById(idAsNumber);

        if (!transaktion) {
            return res.status(404).json({ success: false, error: `Eintrag mit ID ${trId} nicht gefunden.` });
        }
        res.status(200).json({ success: true, data: transaktion })
        
    }catch(error){
        console.error("Fehler beim Laden:", error.message);
        res.status(500).json({ success: false, error: "Interner Serverfehler beim Laden der Daten." });
    }
    

});


serviceRouter.put('/update', (req, res) =>{
    const db = req.app.locals.db;
    const transactionDao = new TransactionDao(db);

    const { tr_id, einnahme, betrag, datum, kategorie, beschreibung, notizen } = req.body;
    
    if (!tr_id) {
        return res.status(400).json({ success: false, error: "Fehlende Transaktions-ID für Update." });
    }


    try{
        const kategorieStatement = db.prepare("SELECT kategorie_id FROM kategorien WHERE name = ?");
        const kategorieRow = kategorieStatement.get(kategorie);

        const updateTransaktion = {
            tr_id: tr_id,
            einnahme: einnahme,
            betrag: betrag,
            datum: datum,
            kategorie_id: kategorieRow.kategorie_id, // Hier die ID übergeben
            beschreibung: beschreibung,
            notizen: notizen
        };

        const aktualisierterEintrag = transactionDao.update(updateTransaktion);

        res.status(200).json({ 
            success: true, 
            data: aktualisierterEintrag // Gibt den gerade aktualisierten Eintrag zurück
        });
    }catch (error) {
        console.error("Fehler beim Aktualisieren:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


serviceRouter.get('/loadAll', (req, res) =>{
    const db = req.app.locals.db;
    const transactionDao = new TransactionDao(db);
    try {
        // ADao ausführen
        const rows = transactionDao.loadAll();
        
        const result = rows.map(row => ({
            id: row.tr_id,
            // Konvertierung von DB-Wert (meist 1/0 oder "true"/"false") in Boolean
            einnahme: row.einnahme === 1 || row.einnahme === "true" || row.einnahme === true, 
            betrag: row.betrag,
            datum: row.datum,
            kategorie: row.kategorie,
            beschreibung: row.beschreibung,
            notizen: row.notizen ?? ""
        }));


        res.json(result);

    } catch (error) {
        console.error("Fehler beim Laden aller Transaktionen:", error);
        res.status(500).json({ success: false, error: "Interner Serverfehler beim Abrufen der Liste." });
    }
})

export default serviceRouter;
