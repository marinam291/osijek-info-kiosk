import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize, { initializeDatabase } from "./config/database.js";
import Item from "./models/Item.js";
import ItemGallery from "./models/ItemGallery.js";
import GppLine from "./models/GppLine.js";
import GppDeparture from "./models/GppDeparture.js";
import MapLocation from "./models/MapLocation.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Info Kiosk Server sa Sequelize-om je spreman!");
});

app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        { model: ItemGallery },
        {
          model: GppLine,
          include: [GppDeparture],
        },
      ],
    });
    res.json(items);
  } catch (err) {
    console.error("Greška pri dohvatu stavki:", err);
    res.status(500).json({ error: "Greška pri dohvatu podataka" });
  }
});

app.get("/api/locations", async (req, res) => {
  try {
    const locations = await MapLocation.findAll();
    res.json(locations);
  } catch (err) {
    console.error("Greška pri dohvatu lokacija:", err);
    res.status(500).json({ error: "Greška pri dohvatu lokacija" });
  }
});

async function startServer() {
  try {
    await initializeDatabase();
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
