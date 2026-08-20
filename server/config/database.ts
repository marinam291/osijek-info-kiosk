import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const dbName = process.env.DB_NAME || "osijek_kiosk";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "localhost";

async function initializeDatabase() {
  // 1. Prvo se spajamo bez odabrane baze da ju automatski stvorimo ako ne postoji
  const connection = await mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await connection.end();
}

// 2. Sada inicijaliziramo Sequelize spojen na našu bazu
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  logging: false,
});

export { initializeDatabase };
export default sequelize;
