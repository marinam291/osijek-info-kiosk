import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import sequelize, { initializeDatabase } from "./config/database.js";
import Item from "./models/Item.js";
import ItemGallery from "./models/ItemGallery.js";
import GppLine from "./models/GppLine.js";
import GppDeparture from "./models/GppDeparture.js";
import MapLocation from "./models/MapLocation.js";
import contactRoutes from "./routes/contactRoutes.js";
import logger from "./config/logger.js";
import * as cheerio from "cheerio";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Info Kiosk Server sa Sequelize-om je spreman!");
});

interface ExternalEvent {
  id: string;
  categoryKey: string;
  nazivHr: string;
  nazivEn: string;
  opisHr: string;
  opisEn: string;
  datum: string;
  link: string;
  slika: string | null;
  infoHr: string;
  infoEn: string;
}

async function syncNewDataDaily() {
  console.log("[CRON] Pokrećem dnevnu provjeru novih vijesti i događaja...");

  try {
    const newsResponse = await fetch(
      "https://www.osijek.hr/wp-json/wp/v2/posts?per_page=5",
    );
    if (newsResponse.ok) {
      const newsData = await newsResponse.json();
      console.log(
        `[CRON] Uspješno provjereno vijesti: ${newsData.length} komada.`,
      );
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const targetUrl = `https://www.osijek031.com/svi-dogadaji/?godina=${currentYear}&mjesec=${currentMonth}&mjesec_odabran=1`;

    const eventsResponse = await fetch(targetUrl);
    if (eventsResponse.ok) {
      const htmlText = await eventsResponse.text();
      const $ = cheerio.load(htmlText);
      let count = 0;
      $("table tr td").each(() => {
        count++;
      });
      console.log(
        `[CRON] Događaji s portala Osijek031 uspješno skenirani (${count} polja).`,
      );
    }
  } catch (error) {
    console.error(
      "[CRON] Greška prilikom automatske dnevne sinkronizacije:",
      error,
    );
  }
}

cron.schedule("0 6 * * *", () => {
  syncNewDataDaily();
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

    const dbItems = items.map((item) => item.toJSON());

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const godina = req.query.godina ? Number(req.query.godina) : currentYear;
    const mjesec = req.query.mjesec ? Number(req.query.mjesec) : currentMonth;

    const externalEvents: ExternalEvent[] = [];
    try {
      const targetUrl = `https://www.osijek031.com/svi-dogadaji/?godina=${godina}&mjesec=${mjesec}&mjesec_odabran=1`;

      const response = await fetch(targetUrl);
      if (response.ok) {
        const htmlText = await response.text();
        const $ = cheerio.load(htmlText);

        $("table tr td").each((index, element) => {
          const textClean = $(element).text().trim();
          const lines = textClean
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l.length > 0);

          if (lines.length > 0) {
            const danMatch = lines[0].match(/^(\d{1,2})\.$/);

            if (danMatch) {
              const dan = danMatch[1].padStart(2, "0");
              const mjesecStr = String(mjesec).padStart(2, "0");
              const datumDogadaja = `${godina}-${mjesecStr}-${dan}`;

              $(element)
                .find("a")
                .each((i, el) => {
                  const nazivDogadaja = $(el).text().trim();
                  let linkDogadaja = $(el).attr("href");

                  if (
                    nazivDogadaja &&
                    !nazivDogadaja.includes("Prethodni") &&
                    !nazivDogadaja.includes("Sljedeći")
                  ) {
                    if (linkDogadaja && !linkDogadaja.startsWith("http")) {
                      linkDogadaja = `https://www.osijek031.com${
                        linkDogadaja.startsWith("/") ? "" : "/"
                      }${linkDogadaja}`;
                    }

                    externalEvents.push({
                      id: `os031_${godina}_${mjesecStr}_${dan}_${i}`,
                      categoryKey: "dogadjanja",
                      nazivHr: nazivDogadaja,
                      nazivEn: nazivDogadaja,
                      opisHr:
                        "Događaj s portala Osijek031. Odaberite za detalje.",
                      opisEn: "Event from Osijek031. Select for details.",
                      datum: datumDogadaja,
                      link: linkDogadaja || "",
                      slika: null,
                      infoHr: "Izvor: Osijek031.com",
                      infoEn: "Source: Osijek031.com",
                    });
                  }
                });
            }
          }
        });
      }
    } catch (scrapeErr) {
      console.warn("Greška pri web scrapingu:", scrapeErr);
    }

    const uniqueEvents = Array.from(
      new Map(
        externalEvents.map((ev) => [`${ev.datum}_${ev.nazivHr}`, ev]),
      ).values(),
    );

    const allItems = [...dbItems, ...uniqueEvents];
    res.json(allItems);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`Greška pri dohvatu stavki: ${errorMessage}`);
    res.status(500).json({ error: "Greška pri dohvatu podataka" });
  }
});

app.get("/api/event-details", async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL je obavezan" });
  }

  try {
    let targetUrl = url;
    if (!targetUrl.startsWith("http")) {
      targetUrl = `https://www.osijek031.com${targetUrl.startsWith("/") ? "" : "/"}${targetUrl}`;
    }

    const response = await fetch(targetUrl);
    if (!response.ok)
      return res.status(404).json({ error: "Nije moguće učitati stranicu" });

    const htmlText = await response.text();
    const $ = cheerio.load(htmlText);

    const paragraphs: string[] = [];
    $("p").each((_, pEl) => {
      const pText = $(pEl).text().trim();
      if (
        pText &&
        pText.length > 25 &&
        !pText.includes("Komentari") &&
        !pText.includes("Osijek031") &&
        !pText.includes("Prijavite se")
      ) {
        paragraphs.push(pText);
      }
    });

    const fullDescription =
      paragraphs.length > 0
        ? paragraphs.join("\n\n")
        : "Detalji dostupni na izvoru.";
    res.json({ opis: fullDescription });
  } catch (err: unknown) {
    res.status(500).json({ error: "Greška pri dohvatu detalja" });
  }
});

app.get("/api/locations", async (req, res) => {
  try {
    const locations = await MapLocation.findAll();
    res.json(locations);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`Greška pri dohvatu lokacija: ${errorMessage}`);
    res.status(500).json({ error: "Greška pri dohvatu lokacija" });
  }
});

app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "online", timestamp: new Date().toISOString() });
});

app.use("/api", contactRoutes);

async function startServer() {
  try {
    await initializeDatabase();
    await sequelize.sync({ alter: true });
    console.log("Baza i tablice su uspješno sinkronizirane!");

    const count = await Item.count();
    if (count === 0) {
      console.log("Baza je prazna. Automatski pokrećem seed skriptu...");
      await import("./seed.js");
    } else {
      console.log("ℹPodaci već postoje u bazi.");
    }

    app.listen(Number(PORT), () => {
      console.log(`Server sluša na portu ${PORT}`);
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`Greška pri pokretanju servera: ${errorMessage}`);
    console.error("Greška pri pokretanju servera:", err);
  }
}

startServer();
