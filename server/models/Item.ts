import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    categoryKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nazivHr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nazivEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opisHr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    opisEn: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vrijemeHr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vrijemeEn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    datum: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infoHr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infoEn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slika: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrLink: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
  },
);

export default Item;
