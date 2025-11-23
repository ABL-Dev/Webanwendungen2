import helper from "../helper";

export default class TODO{

   constructor(dbConnection){
        this.__con = dbConnection;
    }

    create(note){
        const sql = `INSERT INTO todos (note) VALUES (?)`;

        const statment = this.__con.prepare(sql);
        const result = statment.run(note);

        if(result.changes !== 1){
            throw new Error("Fehler beim Einfügen des neuen Todo-Eintrags.");
        }
        const newId = result.lastInsertRowid;

        return this.loadById(newId);
    }

    loadAll(){
        const sql = `
            SELECT todo_id, note, created_at, is_done 
            FROM todos 
            ORDER BY created_at DESC, todo_id DESC
        `;

        const statement = this.__con.prepare(sql);
        const todos = statement.all();

        return todos;
    }

    loadById(id){
        const sql = `
            SELECT todo_id, note, created_at, is_done 
            FROM todos 
            WHERE todo_id = ?
        `;

        const statement = this.__con.prepare(sql);
        const row = statement.get(id);
        
        return row || null
    }

    update(todo) {
        const sql = `
            UPDATE todos 
            SET note = ?, is_done = ?
            WHERE todo_id = ?
        `;

        const params = [
            todo.note, 
            todo.is_done ? 1 : 0, // Konvertiert Boolean zu 1/0
            todo.todo_id
        ];
        
        const statement = this.__con.prepare(sql);
        const result = statement.run(params);

        if (result.changes === 0) {
            throw new Error(`Konnte Todo mit ID ${todo.todo_id} nicht aktualisieren oder nicht finden.`);
        }
        
        // Gibt das aktualisierte Objekt zurück
        return this.loadById(todo.todo_id);
    }

    delete(id) {
        const sql = 'DELETE FROM todos WHERE todo_id = ?';
        
        const statement = this.__con.prepare(sql);
        const result = statement.run(id);

        if (result.changes === 0) {
            throw new Error(`Kein Todo-Eintrag mit der ID ${id} gefunden.`);
        } else if (result.changes > 1) {
            throw new Error(`Unerwartete Anzahl von gelöschten Datensätzen: ${result.changes}`);
        }
        
        return true;
    }

    deleteAll() {
        const sql = `DELETE FROM todos`;
        
        const statement = this.__con.prepare(sql);
        const result = statement.run();
        
        return result.changes;
    }

}