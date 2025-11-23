import helper from "../helper.js";

export default class transactionDao{

    constructor(dbConnection){
        this.__con = dbConnection;
    }

    getConnection(){
        return this.__con;
    }

    loadAll(){
        var sql = 'SELECT * FROM transaktionen';
        var statment = this.__con.prepare(sql);
        var result = statment.all();

        if (helper.isArrayEmpty(result)) {
            return [];
        }
        return result;
    }
    
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

    update(id, transaction){

    }

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