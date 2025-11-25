export default class SETTINGSDAO{

    constructor(dbConnection){
        this.__con = dbConnection;
    };

    loadSprache(){
        const sql = `SELECT sprach_code FROM sprache WHERE id = 1`;

        const statmant = this.__con.prepare(sql);
        const row = statmant.get();

        return row
    };

    loadAllSlots(){
        const sql = `
            SELECT 
                es.slot_id, 
                es.kategorie_id, 
                es.custom_budget,
                k.name AS kategorie_name
            FROM dashboard_slots ds
            LEFT JOIN kategorien k ON ds.kategorie_id = k.kategorie_id
            ORDER BY ds.slot_id ASC
        `;

        const statement = this.__con.prepare(sql);
        const slots = statement.all();

        return slots;
    };

    loadSettings(){
        return{
            sprachCode: this.loadSprache(),
            slots: this.loadAllSlots()
        };
    };

    updateSprache(sprachCode){
        const sql = `
            UPDATE sprache 
            SET sprach_code = ?
            WHERE id = 1
        `;

        const statement = this.__con.prepare(sql);
        const result = statement.run(sprachCode);

        if (result.changes === 0 && this.loadSprache() !== sprachCode) {
            throw new Error("Konnte Sprache nicht in db aktualisiren");
        };
    };

    updateSlots(slots){
        const sql = `
            UPDATE einstellung_slots 
            SET kategorie_id = ?, budget = ?
            WHERE slot_id = ?
        `;

        const statement = this.__con.prepare(sql);

        for(const slot of slots){
            const kategorieID = slot.kategorie_id || null;

            const params = [
                kategorieID,
                slot.budget,
                slot.slot_id
            ]

            const result = statement.run(params);

            if (result.changes === 0) {
                throw new Error("Slots konnten nicht aktuallisirt werden");
            };
        };
    };

    //nur für die einfachheit damit nur eine funktion gebraucht wird
    saveSettings(sprachCode, slots){

        const runInTransakrion = this.__con.transaction(()=>{

            this.updateSprache(sprachCode);
            this.updateSlots(slots);

            return this.loadSettings();
        });

        return runInTransakrion();
    }

};