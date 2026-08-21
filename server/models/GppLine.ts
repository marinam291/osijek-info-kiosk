import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Item from "./Item.js";

class GppLine extends Model {}

GppLine.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    naziv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vrsta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "GppLine",
    tableName: "gpp_lines",
  },
);

Item.hasMany(GppLine, { foreignKey: "serviceId", onDelete: "CASCADE" });
GppLine.belongsTo(Item, { foreignKey: "serviceId", as: "service" });

export default GppLine;
