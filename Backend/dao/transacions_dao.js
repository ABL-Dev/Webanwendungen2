import helper from "../helper.js";

export default class transactionDao{

    constructor(dbConnection){
        this.__con = dbConnection;
    }

    getConnection(){
        return this.__con;
    }

    //Hold alle elemente aus der DB
    loadAll(){
        const sql = `
            SELECT 
                t.tr_id,
                t.einnahme,
                t.betrag,
                t.datum,
                t.beschreibung,
                t.notizen,
                k.name AS kategorie,
                k.kategorie_id 
            FROM transaktionen t
            LEFT JOIN kategorien k 
                ON t.kategorie_id = k.kategorie_id
            ORDER BY t.datum DESC, t.tr_id DESC;
        `;
        var statment = this.__con.prepare(sql);
        var result = statment.all();

        if (helper.isArrayEmpty(result)) {
            return [];
        }
        return result;
    }
    
    loadById(id){
        const sql = `SELECT 
                tr_id, einnahme, betrag, datum, kategorie_id, beschreibung, notizen
            FROM 
                transaktionen 
            WHERE 
                tr_id = ?
        `;

        const statment = this.__con.prepare(sql);
        const row = statment.get(id);
        //WEnn es die reihe nicht gibt kommt nul zurück
        return row || null;
    }

    // Erstellt neuen Eintrag
    create(transaction){

        const sql = `
            INSERT INTO transaktionen (
                einnahme, betrag, datum, kategorie_id, beschreibung, notizen
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;

        // Parameter arry
        const params = [
            transaction.einnahme,
            transaction.betrag,
            transaction.datum,
            transaction.kategorie_id,
            transaction.beschreibung,
            transaction.notizen || null
        ];

        //Statemens ausführen
        const statment = this.__con.prepare(sql);
        const result = statment.run(params);

        //Ergebins Prüfen
        if (result.changes !==1) {
            throw new Error('Fehler beim Einfügen des neuen Transaktins-Eintrags.');
        }

        const newId = result.lastInsertRowid;

        return {tr_id: newId, ...transaction};

    }

    //Ändert einen eintrag ab
    update(transaction){
        const sql = `
            UPDATE transaktionen 
            SET
                einnahme = ?, 
                betrag = ?, 
                datum = ?, 
                kategorie_id = ?, 
                beschreibung = ?, 
                notizen = ?
            WHERE 
                tr_id = ?
        `;

        // Parameter arry
        const params = [
            transaction.einnahme,
            transaction.betrag,
            transaction.datum,
            transaction.kategorie_id,
            transaction.beschreibung,
            transaction.notizen || null,
            transaction.tr_id
        ];

        const statment = this.__con.prepare(sql);
        const result = statment.run(params);

        if (result.changes === 0) {
            throw new Error(`Konnte Eintrag mit ID ${transaction.tr_id} nicht aktualisiren`);
        }

        return this.loadById(transaction.tr_id);
    }

    //Löschen von Transaktionen
    delete(id){
        const sql = 'DELETE FROM transaktionen WHERE tr_id = ?';

        const statment = this.__con.prepare(sql);
        const result = statment.run(id);

        if(result.changes === 1){
            return true;
        }else if(result.changes === 0){
            throw new Error(`Kein Eintrag mit der ID ${id} gefunden`);
        }else{
            throw new Error(`Unerwartete Anzhal von gelöschten Datensätzen: ${result.changes}`);
        }
    }
    

}