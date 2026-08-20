import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize, { initializeDatabase } from "./config/database.js";
import "./models/Item.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Info Kiosk Server sa Sequelize-om je spreman!");
});

async function startServer() {
  try {
    // Automatski kreiraj bazu ako ne postoji
    await initializeDatabase();

    // Sinkroniziraj tablice
    await sequelize.sync({ alter: true });
    console.log("Baza i tablice su uspješno sinkronizirane!");

    app.listen(Number(PORT), () => {
      console.log(`Server sluša na portu ${PORT}`);
    });
  } catch (err) {
    console.error("Greška pri pokretanju servera:", err);
  }
}

startServer();
