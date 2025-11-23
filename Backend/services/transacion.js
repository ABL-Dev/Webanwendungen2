import helper from "../helper.js";
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
    catch{
        console.log("Fehler beim Löschen:", error.message);

        if (error.message.includes("Kein Eintrag mit der ID")){
            return res.status(404).json({success: false, error: error.message});
        }
        res.status(500).json({success: false, error: "Interner Serverfehler beim Löschen."});
    }

});


export default serviceRouter;
