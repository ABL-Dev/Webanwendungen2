import SettingsDAO from "../dao/settings_dao.js";
import express from "express";

var settingsRouter = express.Router();


settingsRouter.get('/settings/load', (req, res) =>{

    const db = req.app.locals.db;
    const settingsDao = new SettingsDAO(db);

    try {
        const settings = settingsDao.loadSettings();

        res.status(200).json({
            success: true,
            data: settings
        });

    } catch (error) {
        res.status(500).json({success: false, error: "Interner Serverfehler beim Laden der Einstellung" + error.massage});
    }
});

settingsRouter.post('/settings/save', (req, res) =>{

    const db = req.app.locals.db;
    const settingsDao = new SettingsDAO(db);

    const {sprachCode, slots} = req.body;

    // validirung
    if (!sprachCode || !['DE', 'EN'].includes(sprachCode)) {
        return res.status(400).json({success: false, error: "Ungültiger sprachCode"});
    }

    if (!Array.isArray(slots) || slots.length !==5) {
        return res.status(400).json({success: false, error: "Es müssen genau 5 slots übergeben werden."});
    }

    // Slot prüfung
    for (const slot of slots){
        if (slot.slot_id < 1 || slot.slot_id > 5 || typeof slot.budget !== 'number') {
            return res.status(400).json({success: false, error: "Ungültige Slot Daten"});
        }

        const isCategoryIdValid = 
        (typeof slot.kategorie_id === 'number' && slot.kategorie_id > 0) ||
        (slot.kategorie_id === null || slot.kategorie_id === undefined);

        if (!isCategoryIdValid) {
            return res.status(400).json({success: false, error: "Ungültige Kategori_ID"});
        }
    }

    //Speichern

    try {
        
        const aktualisierteSettings = settingsDao.saveSettings(sprachCode, slots);

        res.status(200).json({
            sucess: true,
            data: aktualisierteSettings
        });
    } catch (error) {
        res.status(500).json({success: false, error: "Interner Serverfehler beim Speichern der Daten:" + error.message})
    }


});

export default settingsRouter;