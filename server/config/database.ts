import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : 15331;

if (!dbName || !dbUser || !dbPassword || !dbHost) {
  throw new Error(
    "Greška: Nedostaju svi potrebni parametri za bazu u .env datoteci (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST)!",
  );
}

async function initializeDatabase() {
  let connected = false;
  let retries = 5;

  while (retries > 0 && !connected) {
    try {
      const connection = await mysql.createConnection({
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPassword,
        ssl: { rejectUnauthorized: false },
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
      await connection.end();
      connected = true;
      console.log("Uspješno spojeno na bazu i provjereno postojanje baze!");
    } catch (err) {
      retries--;
      console.log(
        `Baza još nije spremna, preostalo pokušaja: ${retries}. Čekam 2 sekunde...`,
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  if (!connected) {
    throw new Error(
      "Ne mogu se spojiti na MySQL bazu nakon nekoliko pokušaja.",
    );
  }
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { initializeDatabase };
export default sequelize;
