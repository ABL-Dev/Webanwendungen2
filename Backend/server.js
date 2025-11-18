import express from 'express';
import Database from 'better-sqlite3';
import fs from "fs";

try{
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Datenbak
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //connect database
    console.log("Verbindung zur datenbank wird hergestelt");
    const dbOptions = {verbose: console.log};
    const dbFile = "./db/webanw2.sqlite";
    const db = new Database(dbFile, dbOptions);


    //Prüfen ob die tabelen schon Existiren
    const exists = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='transactions'`).get();

    if(!exists){
        const tabelen = fs.readFileSync("./db/Create Tabels.sql", "utf8");
        db.exec(tabelen);
    }
    console.log("DB wurde erstellt");


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Webserver
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // Webserver starten
    const HTTP_PORT = 8000;
    const app = express();
    app.use(express.static("../Frontend"))

    app.get('/', (req, res) =>{
        res.sendFile(__dirname, '../Frontend/index.html');
    })

    app.listen(HTTP_PORT, ()=>{
        console.log(`Server hört auf port ${HTTP_PORT}`)
    })


}
catch(ex){
    console.log("Beim Starten ist etwas schief gelaufen!")
    console.log(ex)
}