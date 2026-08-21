import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import GppLine from "./GppLine.js";

class GppDeparture extends Model {}

GppDeparture.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    departureTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "GppDeparture",
    tableName: "gpp_departures",
  },
);

GppLine.hasMany(GppDeparture, { foreignKey: "lineId", onDelete: "CASCADE" });
GppDeparture.belongsTo(GppLine, { foreignKey: "lineId" });

export default GppDeparture;
