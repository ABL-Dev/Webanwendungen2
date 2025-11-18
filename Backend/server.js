import express from 'express';

try{
    // Webserver starten
    const HTTP_PORT = 8000;
    const app = express();
    app.use(express.static("../Frontend"))

    app.get('/', (req, res) =>{
        res.sendFile(__dirname, '../Frontend/index.html')
    })

    app.listen(HTTP_PORT, ()=>{
        console.log(`Server hört auf port ${HTTP_PORT}`)
    })

}
catch(ex){
    console.log("Beim Starten ist etwas schief gelaufen!")
    console.log(ex)
}