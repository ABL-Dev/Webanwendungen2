import TodoDao from "../dao/todo_dao";
import express from 'express';

var serviceRouter = express.Router();

// Neuen Eintrag machen
serviceRouter.get('/todo/write', (req, res) => {
    
    const db = req.app.locals.db;
    const tododao = new TodoDao(db);

    const {note} = req.body;

    if(!note || typeof note !== 'string' || note.trim() === ''){
        return res.status(400).json({success: false, error: " Die Notiz ist erforderlich und darf nicht leer sein"});
    }

    try {
        const neuerEintrag = tododao.create(note);

        res.status(201).json({
            success: true,
            data: neuerEintrag
        });
    } catch (error) {
        res.status(500).json({sucess: false, error: error.message});
    }

});

//alle Laden
serviceRouter.get('/todo/loadAll', (req, res) => {
    const db = req.app.locals.db;
    const todoDao = new TODO(db);

    try {
        const todos = todoDao.loadAll();

        const result = todos.map(row => ({
            id: row.todo_id,
            note: row.note,
            created_at: row.created_at,
            is_done: row.is_done === 1 // Konvertiert DB-Wert (1/0) zu Boolean
        }));

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(500).json({ success: false, error: "Interner Serverfehler beim Abrufen der Todo-Liste." });
    }
});

//Updaten von Notizen
serviceRouter.put('/todo/update', (req, res) => {
    const db = req.app.locals.db;
    const todoDao = new TODO(db);

    const { todo_id, note, is_done } = req.body;

    // Basis-Validierung
    if (!todo_id || typeof note === 'undefined' || typeof is_done === 'undefined') {
        return res.status(400).json({ success: false, error: "Fehlende 'todo_id', 'note' oder 'is_done' für Update." });
    }

    const idAsNumber = parseInt(todo_id, 10);
    if (isNaN(idAsNumber)){
        return res.status(400).json({ success: false, error: "Ungültige Todo-ID." });
    }


    try {
        // Objekt für die DAO vorbereiten
        const todoZumUpdate = {
            todo_id: idAsNumber,
            note: note,
            is_done: is_done // Boolean
        };

        const aktualisierterEintrag = todoDao.update(todoZumUpdate);

        // Erfolg zurückmelden
        res.status(200).json({
            success: true,
            data: {
                id: aktualisierterEintrag.todo_id,
                note: aktualisierterEintrag.note,
                created_at: aktualisierterEintrag.created_at,
                is_done: aktualisierterEintrag.is_done === 1 // Konvertiert DB-Wert zu Boolean
            }
        });
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Todo-Eintrags:", error);

        // Spezifische 404-Behandlung für nicht gefundenen Eintrag
        if (error.message.includes("nicht aktualisieren oder nicht finden")) {
            return res.status(404).json({ success: false, error: error.message });
        }

        res.status(500).json({ success: false, error: error.message || "Interner Serverfehler beim Aktualisieren." });
    }
});

//Löschen von einzelen einträgen
serviceRouter.delete('/todo/delete/:id', (req, res) => {
    const db = req.app.locals.db;
    const todoDao = new TODO(db);

    const id = req.params.id;

    // URL String in Zahl ändern und prüfen
    const idAsNumber = parseInt(id, 10);
    if (isNaN(idAsNumber)) {
        return res.status(400).json({ success: false, error: "Ungültige Todo-ID." });
    }

    try {
        // DAO aufrufen
        todoDao.delete(idAsNumber);

        // 204 No Content, da kein Body zurückgegeben wird
        res.status(204).end();

    } catch (error) {
        console.error("Fehler beim Löschen des Todo-Eintrags:", error.message);

        // Spezifische 404-Behandlung für nicht gefundenen Eintrag
        if (error.message.includes("Kein Todo-Eintrag mit der ID")) {
            return res.status(404).json({ success: false, error: error.message });
        }
        res.status(500).json({ success: false, error: "Interner Serverfehler beim Löschen." });
    }

});

//Nach id laden 
serviceRouter.get('/todo/load/:id', (req, res) => {
    const db = req.app.locals.db;
    const todoDao = new TODO(db);

    const id = req.params.id;
    const idAsNumber = parseInt(id, 10);

    if (isNaN(idAsNumber)) {
        return res.status(400).json({ success: false, error: "Ungültige Todo-ID." });
    }

    try {
        const todo = todoDao.loadById(idAsNumber);

        if (!todo) {
            return res.status(404).json({ success: false, error: `Eintrag mit ID ${idAsNumber} nicht gefunden.` });
        }

        // Ergebnis für den Client formatieren
        const result = {
            id: todo.todo_id,
            note: todo.note,
            created_at: todo.created_at,
            is_done: todo.is_done === 1
        };

        res.status(200).json({ success: true, data: result });

    } catch (error) {
        console.error("Fehler beim Laden des Todo:", error.message);
        res.status(500).json({ success: false, error: "Interner Serverfehler beim Laden der Daten." });
    }
});

//Alle Löschen
serviceRouter.delete('todo/deleteAll', (req, res) => {
    const db = req.app.locals.db;
    const todoDao = new TODO(db);

    try {
        // DAO aufrufen
        const deletedCount = todoDao.deleteAll();

        // Erfolg zurückmelden
        res.status(200).json({
            success: true,
            message: `${deletedCount} Todo-Einträge erfolgreich gelöscht.`
        });

    } catch (error) {
        console.error("Fehler beim Löschen aller Todos:", error.message);
        res.status(500).json({ success: false, error: "Interner Serverfehler beim Löschen aller Einträge." });
    }
});

export default serviceRouter;