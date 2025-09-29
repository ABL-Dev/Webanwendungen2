import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";

import { userRouter } from "./api/user.js";

dotenv.config();
// Ersatz für __dirname in ES-Modulen
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.NODE_ENV === "development" ? 3000 : 8080;

// express.json() Middleware zum Parsen von JSON-Anfragen
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Benutzer-Routen einbinden
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);

  if (process.env.NODE_ENV === "development") {
    console.log("Modus: Entwicklung 🚀");
  } else {
    console.log("Modus: Produktion 🏭");
  }
});

export { app };