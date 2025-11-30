export default class SETTINGSDAO{

    constructor(dbConnection){
        this.__con = dbConnection;
    };

    loadAllSlots(){
        const sql = `
            SELECT 
                es.slot_id, 
                es.kategorie_id, 
                es.budget,
                k.name AS kategorie_name
            FROM einstellung_slots es
            LEFT JOIN kategorien k ON es.kategorie_id = k.kategorie_id
            ORDER BY es.slot_id ASC
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
        };
    };
};